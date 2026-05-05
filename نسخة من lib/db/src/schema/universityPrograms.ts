import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const universityProgramsTable = pgTable("university_programs", {
  id: serial("id").primaryKey(),
  universityAr: text("university_ar").notNull(),
  universityShort: varchar("university_short", { length: 32 }).notNull(),
  programAr: text("program_ar").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  admissionRate: integer("admission_rate").notNull(),
  careersAr: text("careers_ar").array().notNull(),
  certificationsAr: text("certifications_ar")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});

export const insertUniversityProgramSchema = createInsertSchema(
  universityProgramsTable,
).omit({ id: true });
export type InsertUniversityProgram = z.infer<
  typeof insertUniversityProgramSchema
>;
export type UniversityProgram = typeof universityProgramsTable.$inferSelect;
