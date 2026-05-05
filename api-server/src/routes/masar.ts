import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import {
  db,
  specializationsTable,
  studyTipsTable,
  universityProgramsTable,
  conversations,
} from "@workspace/db";
import {
  ListStagesResponse,
  ListSpecializationsResponse,
  ListStudyTipsResponse,
  ListUniversityProgramsResponse,
  GetDashboardSummaryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const STAGES = [
  {
    id: "middle_school",
    nameAr: "المرحلة المتوسطة",
    descriptionAr:
      "بناء الأساس الأكاديمي القوي وتطوير عادات المذاكرة المستدامة قبل دخول الثانوية.",
    icon: "BookOpen",
  },
  {
    id: "high_school",
    nameAr: "المرحلة الثانوية",
    descriptionAr:
      "التركيز على المواد الأساسية، رفع المعدل التراكمي، والاستعداد لاختبارات القدرات والتحصيلي.",
    icon: "GraduationCap",
  },
  {
    id: "university_prep",
    nameAr: "التحضير الجامعي",
    descriptionAr:
      "اختيار التخصص المناسب، فهم متطلبات القبول، والتحضير للسنة التحضيرية.",
    icon: "Compass",
  },
  {
    id: "university",
    nameAr: "المرحلة الجامعية",
    descriptionAr:
      "إتقان مهارات الدراسة الجامعية، إدارة الوقت بين المواد، والاستعداد لسوق العمل.",
    icon: "Award",
  },
];

router.get("/masar/stages", async (_req, res): Promise<void> => {
  res.json(ListStagesResponse.parse(STAGES));
});

router.get("/masar/specializations", async (_req, res): Promise<void> => {
  const rows = await db.select().from(specializationsTable);
  res.json(ListSpecializationsResponse.parse(rows));
});

router.get("/masar/study-tips", async (_req, res): Promise<void> => {
  const rows = await db.select().from(studyTipsTable);
  res.json(ListStudyTipsResponse.parse(rows));
});

router.get("/masar/university-programs", async (_req, res): Promise<void> => {
  const rows = await db.select().from(universityProgramsTable);
  res.json(ListUniversityProgramsResponse.parse(rows));
});

router.get("/masar/dashboard-summary", async (_req, res): Promise<void> => {
  const [{ specializationsCount }] = await db
    .select({ specializationsCount: sql<number>`count(*)::int` })
    .from(specializationsTable);
  const [{ tipsCount }] = await db
    .select({ tipsCount: sql<number>`count(*)::int` })
    .from(studyTipsTable);
  const [{ conversationsCount }] = await db
    .select({ conversationsCount: sql<number>`count(*)::int` })
    .from(conversations);

  const byCategoryRows = await db
    .select({
      category: specializationsTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(specializationsTable)
    .groupBy(specializationsTable.category);

  res.json(
    GetDashboardSummaryResponse.parse({
      totalStages: STAGES.length,
      totalSpecializations: specializationsCount,
      totalStudyTips: tipsCount,
      totalConversations: conversationsCount,
      specializationsByCategory: byCategoryRows,
    }),
  );
});

export default router;
