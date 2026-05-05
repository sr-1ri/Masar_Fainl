import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const studyTipsTable = pgTable("study_tips", {
  id: serial("id").primaryKey(),
  titleAr: text("title_ar").notNull(),
  bodyAr: text("body_ar").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export const insertStudyTipSchema = createInsertSchema(studyTipsTable).omit({
  id: true,
});
export type InsertStudyTip = z.infer<typeof insertStudyTipSchema>;
export type StudyTip = typeof studyTipsTable.$inferSelect;
