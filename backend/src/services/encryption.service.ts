import crypto from 'node:crypto';
import argon2 from 'argon2';

// In production, this system public key should be loaded from secure environment variables or a KMS.
// We generate one on-the-fly for demonstration purposes here.
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

export class EncryptionService {
  /**
   * Generates a non-sequential Reference ID token.
   * e.g., REF-ABCD-1234-WXYZ
   */
  static generateReferenceId(): string {
    const randomHex = crypto.randomBytes(6).toString('hex').toUpperCase(); // 12 chars
    return `REF-${randomHex.slice(0, 4)}-${randomHex.slice(4, 8)}-${randomHex.slice(8, 12)}`;
  }

  /**
   * Hashes the Reference ID using Argon2id for secure lookup.
   */
  static async hashReferenceId(referenceId: string): Promise<string> {
    return await argon2.hash(referenceId, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
  }

  /**
   * Verifies a Reference ID against its hash.
   */
  static async verifyReferenceId(hash: string, referenceId: string): Promise<boolean> {
    return await argon2.verify(hash, referenceId);
  }

  /**
   * Encrypts a confidential payload using AES-256-GCM envelope encryption.
   * A symmetric DEK is generated for the payload, and then encrypted with the public key.
   */
  static encryptPayload(payload: string, userPublicKey: string = publicKey.export({ type: 'spki', format: 'pem' }).toString()) {
    // Generate AES-256-GCM Data Encryption Key (DEK) & IV
    const dek = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', dek, iv);
    
    let encryptedPayload = cipher.update(payload, 'utf8');
    encryptedPayload = Buffer.concat([encryptedPayload, cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Encrypt the DEK using the provided Public Key (Envelope Encryption)
    const encryptedDek = crypto.publicEncrypt(userPublicKey, dek);

    return {
      encryptedPayload,
      initialVector: iv,
      authTag,
      encryptedDek: encryptedDek.toString('base64'),
    };
  }

  /**
   * Decrypts the payload using the private key to unwrap the DEK.
   */
  static decryptPayload(encryptedPayload: Buffer, iv: Buffer, authTag: Buffer, encryptedDekBase64: string, userPrivateKey: crypto.KeyObject = privateKey) {
    const encryptedDek = Buffer.from(encryptedDekBase64, 'base64');
    
    // Unwrap the DEK
    const dek = crypto.privateDecrypt(userPrivateKey, encryptedDek);

    const decipher = crypto.createDecipheriv('aes-256-gcm', dek, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedPayload);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  }
}
