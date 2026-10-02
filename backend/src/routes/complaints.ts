import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { complaints } from '../db/schema';
import { EncryptionService } from '../services/encryption.service';
import redis from '../services/cache.service';

interface CreateComplaintBody {
  reportType: 'ANONYMOUS' | 'CONFIDENTIAL';
  complainantId?: string; // Null if ANONYMOUS
  narrativePayload: string; // The sensitive text/details to encrypt
  district: string;
}

export default async function complaintRoutes(fastify: FastifyInstance) {
  fastify.post('/complaints', async (request, reply) => {
    const { reportType, complainantId, narrativePayload, district } = request.body as CreateComplaintBody;

    try {
      // 1. Generate secure reference ID and hash
      const referenceId = EncryptionService.generateReferenceId();
      const referenceIdHash = await EncryptionService.hashReferenceId(referenceId);
      const referenceIdPrefix = referenceId.split('-')[1]; // The first 4 random chars

      // 2. Encrypt the sensitive payload
      const { encryptedPayload, initialVector, authTag } = EncryptionService.encryptPayload(narrativePayload);

      // 3. Save to database
      const [newComplaint] = await db.insert(complaints).values({
        referenceIdHash,
        referenceIdPrefix,
        reportType,
        complainantId: reportType === 'ANONYMOUS' ? null : complainantId,
        encryptedPayload,
        initialVector,
        authTag,
        district,
        // statutoryDeadline is handled by default via schema logic or application layer
        statutoryDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // +60 days
      }).returning();

      // 4. Dispatch Real-Time Update for DLSA / Admins via Redis PubSub
      await redis.publish('dispatch:new-complaint', JSON.stringify({
        complaintId: newComplaint.id,
        status: newComplaint.status,
        district: newComplaint.district,
        timestamp: newComplaint.createdAt,
      }));

      // Return the unhashed reference ID ONE TIME ONLY to the user (Burn on Read logic for displaying)
      // They must save it. It won't be stored in plain text anywhere.
      return reply.status(201).send({
        success: true,
        referenceId, // WARNING: Must be stored securely by client, cannot be recovered.
        complaintId: newComplaint.id,
        message: 'Complaint registered securely.'
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to process complaint' });
    }
  });
}
