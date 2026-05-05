import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const specializationsTable = pgTable("specializations", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  descriptionAr: text("description_ar").notNull(),
  topUniversitiesAr: text("top_universities_ar").array().notNull(),
  careerPathsAr: text("career_paths_ar").array().notNull(),
  demandLevel: varchar("demand_level", { length: 16 }).notNull(),
});

export const insertSpecializationSchema = createInsertSchema(
  specializationsTable,
).omit({ id: true });
export type InsertSpecialization = z.infer<typeof insertSpecializationSchema>;
export type Specialization = typeof specializationsTable.$inferSelect;
