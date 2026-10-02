import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
  customType,
  smallint,
  numeric
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: string }>({
  dataType() {
    return "bytea";
  },
  toDriver(val: Buffer) {
    return `\\x${val.toString("hex")}`;
  },
  fromDriver(val: string) {
    if (val.startsWith("\\x")) {
      return Buffer.from(val.slice(2), "hex");
    }
    return Buffer.from(val);
  },
});

export const userRoleEnum = pgEnum("user_role", [
  "VICTIM_USER",
  "DLSA_OFFICER",
  "CLINICAL_ADVISOR",
  "SYSTEM_ADMIN",
]);

export const reportTypeEnum = pgEnum("report_type", [
  "ANONYMOUS",
  "CONFIDENTIAL",
]);

export const reportStatusEnum = pgEnum("report_status", [
  "SUBMITTED",
  "UNDER_LEGAL_TRIAGE",
  "ESCALATED_SECTION15A",
  "DLSA_ASSIGNED",
  "RESOLVED",
]);

export const riskLevelEnum = pgEnum("risk_level", [
  "MILD",
  "MODERATE",
  "HIGH_DISTRESS",
  "ACUTE_CRISIS",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: userRoleEnum("role").notNull().default("VICTIM_USER"),
  email: varchar("email", { length: 255 }).unique(),
  phoneNumberEncrypted: text("phone_number_encrypted"),
  passwordHash: varchar("password_hash", { length: 255 }), // Argon2id hash
  district: varchar("district", { length: 100 }),
  state: varchar("state", { length: 100 }),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const complaints = pgTable("complaints", {
  id: uuid("id").primaryKey().defaultRandom(),
  referenceIdHash: varchar("reference_id_hash", { length: 255 }).notNull().unique(),
  referenceIdPrefix: varchar("reference_id_prefix", { length: 10 }).notNull(),
  reportType: reportTypeEnum("report_type").notNull(),
  complainantId: uuid("complainant_id").references(() => users.id, { onDelete: "set null" }),
  encryptedPayload: bytea("encrypted_payload").notNull(),
  initialVector: bytea("initial_vector").notNull(),
  authTag: bytea("auth_tag").notNull(),
  status: reportStatusEnum("status").notNull().default("SUBMITTED"),
  requiresWitnessProtection: boolean("requires_witness_protection").default(false),
  statutoryDeadline: timestamp("statutory_deadline", { withTimezone: true }), // handle default 60 days in code
  assignedDlsaOfficer: uuid("assigned_dlsa_officer").references(() => users.id),
  district: varchar("district", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const complaintEvidence = pgTable("complaint_evidence", {
  id: uuid("id").primaryKey().defaultRandom(),
  complaintId: uuid("complaint_id")
    .notNull()
    .references(() => complaints.id, { onDelete: "cascade" }),
  storageKey: varchar("storage_key", { length: 512 }).notNull(),
  originalFilenameObfuscated: varchar("original_filename_obfuscated", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileSizeBytes: numeric("file_size_bytes").notNull(),
  sha256Checksum: varchar("sha256_checksum", { length: 64 }).notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow(),
});

export const clinicalAssessments = pgTable("clinical_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionFingerprint: varchar("session_fingerprint", { length: 64 }),
  intrusiveShockScore: smallint("intrusive_shock_score").notNull(),
  avoidanceScore: smallint("avoidance_score").notNull(),
  hypervigilanceScore: smallint("hypervigilance_score").notNull(),
  sleepDisturbanceScore: smallint("sleep_disturbance_score").notNull(),
  fearRetaliationScore: smallint("fear_retaliation_score").notNull(),
  compositeScorePercent: numeric("composite_score_percent", { precision: 5, scale: 2 }).notNull(),
  riskTier: riskLevelEnum("risk_tier").notNull(),
  aiDocketSummary: text("ai_docket_summary"),
  emergencyContacted: boolean("emergency_contacted").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const dlsaDirectory = pgTable("dlsa_directory", {
  id: uuid("id").primaryKey().defaultRandom(),
  officerName: varchar("officer_name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 150 }).notNull(),
  jurisdictionDistrict: varchar("jurisdiction_district", { length: 100 }).notNull(),
  jurisdictionState: varchar("jurisdiction_state", { length: 100 }).notNull(),
  directHelplinePhone: varchar("direct_helpline_phone", { length: 50 }).notNull(),
  officeAddress: text("office_address"),
  isActiveDuty: boolean("is_active_duty").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const secureAuditLogs = pgTable("secure_audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: uuid("entity_id").notNull(),
  performedByRole: userRoleEnum("performed_by_role").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});
