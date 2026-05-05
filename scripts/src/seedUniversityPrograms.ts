import {
  db,
  universityProgramsTable,
  pool,
  eq,
} from "@workspace/db";

type Uni = { ar: string; short: string };
const UNIS: Record<string, Uni> = {
  KKU: { ar: "جامعة الملك خالد (أبها)", short: "KKU" },
  KSU: { ar: "جامعة الملك سعود", short: "KSU" },
  KAU: { ar: "جامعة الملك عبدالعزيز", short: "KAU" },
  KFUPM: { ar: "جامعة الملك فهد للبترول والمعادن", short: "KFUPM" },
  IMAMU: { ar: "جامعة الإمام محمد بن سعود", short: "IMAMU" },
  UQU: { ar: "جامعة أم القرى", short: "UQU" },
  KAUST: {
    ar: "جامعة الملك عبدالله للعلوم والتقنية (KAUST – ثول)",
    short: "KAUST",
  },
  UJ: { ar: "جامعة جدة (طيبة التكنولوجية)", short: "UJ" },
};

interface Program {
  programAr: string;
  category: string;
  careersAr: string[];
  certificationsAr: string[];
  rates: Partial<Record<keyof typeof UNIS, number>>;
}

const PROGRAMS: Program[] = [
  {
    programAr: "طب بشري",
    category: "العلوم الصحية",
    careersAr: ["طبيب عام", "استشاري", "باحث طبي", "طبيب طوارئ"],
    certificationsAr: ["SLE", "USMLE", "BLS", "ACLS"],
    rates: { KKU: 96, KSU: 98, KAU: 97, UQU: 96 },
  },
  {
    programAr: "تمريض",
    category: "العلوم الصحية",
    careersAr: ["ممرض ممارس", "رئيس قسم تمريض", "ممرض اختصاص"],
    certificationsAr: ["NCLEX", "BLS", "Saudi Nurses License"],
    rates: { KKU: 82, KSU: 85, KAU: 84, UQU: 83 },
  },
  {
    programAr: "صيدلة",
    category: "العلوم الصحية",
    careersAr: ["صيدلي مجتمعي", "صيدلي مستشفى", "صيدلي صناعي"],
    certificationsAr: ["SPLE", "BCPS", "SCFHS"],
    rates: { KKU: 92, KSU: 94, KAU: 93, UQU: 91 },
  },
  {
    programAr: "الذكاء الاصطناعي",
    category: "الهندسة والحاسب",
    careersAr: ["مهندس تعلم آلي", "عالم بيانات", "مستشار ذكاء اصطناعي"],
    certificationsAr: ["TensorFlow Developer", "AWS ML Specialty", "Azure AI Engineer"],
    rates: { KKU: 88, KSU: 92, KAU: 91, KFUPM: 94, IMAMU: 87, UQU: 86 },
  },
  {
    programAr: "هندسة برمجيات",
    category: "الهندسة والحاسب",
    careersAr: ["مطور تطبيقات", "مهندس برمجيات", "مهندس DevOps"],
    certificationsAr: ["AWS Developer", "Scrum Master (PSM I)", "Google Cloud Engineer"],
    rates: { KKU: 89, KSU: 93, KAU: 90, KFUPM: 95, IMAMU: 88, UQU: 87 },
  },
  {
    programAr: "أمن سيبراني",
    category: "الهندسة والحاسب",
    careersAr: ["محلل أمن معلومات", "مختبر اختراق", "مدير أمن سيبراني"],
    certificationsAr: ["CompTIA Security+", "CEH", "CISSP", "OSCP"],
    rates: { KKU: 88, KSU: 92, KAU: 90, KFUPM: 93, IMAMU: 89, UQU: 86, UJ: 89 },
  },
  {
    programAr: "هندسة ميكانيكية",
    category: "الهندسة والحاسب",
    careersAr: ["مهندس تصميم", "مهندس صيانة", "مهندس مشاريع"],
    certificationsAr: ["SCE Membership", "PMP", "Six Sigma Green Belt"],
    rates: { KKU: 85, KSU: 90, KAU: 88, KFUPM: 93, UQU: 84 },
  },
  {
    programAr: "تسويق رقمي",
    category: "العلوم الإدارية",
    careersAr: ["مسؤول تسويق رقمي", "مدير محتوى", "محلل أداء"],
    certificationsAr: ["Google Ads", "HubSpot Inbound", "Meta Blueprint"],
    rates: { KKU: 76, KSU: 82, KAU: 80, KFUPM: 78, IMAMU: 77, UQU: 75 },
  },
  {
    programAr: "مالية",
    category: "العلوم الإدارية",
    careersAr: ["محلل مالي", "مدير استثمار", "محاسب CPA"],
    certificationsAr: ["CFA", "CMA", "SOCPA", "FMVA"],
    rates: { KKU: 80, KSU: 85, KAU: 83, KFUPM: 82, IMAMU: 79, UQU: 78 },
  },
  {
    programAr: "إدارة سلاسل الإمداد واللوجستيات",
    category: "العلوم الإدارية",
    careersAr: [
      "مدير سلسلة إمداد",
      "محلل لوجستي",
      "مسؤول مشتريات",
      "مخطط نقل وتوزيع",
    ],
    certificationsAr: ["CSCP", "CPIM", "CLTD", "Six Sigma"],
    rates: { KKU: 78, KSU: 84, KAU: 82, KFUPM: 81, UQU: 76, UJ: 83 },
  },
  {
    programAr: "طاقة متجددة",
    category: "تخصصات المستقبل",
    careersAr: ["مهندس طاقة شمسية", "مستشار طاقة متجددة", "مدير محطة توليد"],
    certificationsAr: ["NABCEP", "CEM", "ISO 50001 Lead Auditor"],
    rates: { KKU: 84, KSU: 88, KAU: 87, KFUPM: 90, UQU: 82 },
  },
  {
    programAr: "استدامة",
    category: "تخصصات المستقبل",
    careersAr: ["مستشار استدامة", "محلل ESG", "مسؤول أثر بيئي"],
    certificationsAr: ["LEED Green Associate", "GRI Certified", "ISSP-SA"],
    rates: { KKU: 80, KSU: 85, KAU: 86, KFUPM: 84, UQU: 78 },
  },
  {
    programAr: "سياحة وفندقة",
    category: "تخصصات المستقبل",
    careersAr: ["مدير فندق", "مرشد سياحي معتمد", "منسق فعاليات"],
    certificationsAr: ["Tourism License (MoT)", "CHIA", "Event Management Cert"],
    rates: { KKU: 72, KSU: 78, KAU: 80, UQU: 75 },
  },

  // ======== تخصصات جديدة 2026 ========
  {
    programAr: "هندسة أشباه الموصلات",
    category: "تخصصات المستقبل",
    careersAr: [
      "مهندس تصميم رقائق",
      "مهندس تصنيع شرائح",
      "باحث في الإلكترونيات الدقيقة",
    ],
    certificationsAr: [
      "SEMI Certified Technician",
      "Cadence / Synopsys Tools",
      "IPC-A-610",
    ],
    rates: { KAUST: 96, KFUPM: 92, KSU: 89 },
  },
  {
    programAr: "تقنيات الكربون المستدام",
    category: "تخصصات المستقبل",
    careersAr: [
      "مهندس احتجاز الكربون (CCUS)",
      "محلل بصمة كربونية",
      "مستشار حياد صفري",
    ],
    certificationsAr: ["GHG-P Certified", "ISO 14064", "LEED AP"],
    rates: { KAUST: 94, KFUPM: 90, KAU: 86 },
  },
  {
    programAr: "الذكاء الاصطناعي التوليدي",
    category: "تخصصات المستقبل",
    careersAr: [
      "مهندس نماذج لغوية كبيرة (LLM)",
      "مهندس Prompt متقدم",
      "باحث Generative AI",
    ],
    certificationsAr: [
      "NVIDIA Generative AI Specialist",
      "OpenAI API Pro",
      "Hugging Face Certified",
    ],
    rates: { KAUST: 97, KSU: 93, KFUPM: 94, KAU: 92, UJ: 90 },
  },
  {
    programAr: "علوم الفضاء",
    category: "تخصصات المستقبل",
    careersAr: [
      "مهندس أنظمة فضائية",
      "محلل بيانات الأقمار الصناعية",
      "باحث فيزياء فلكية",
    ],
    certificationsAr: ["ESA / NASA Open Courseware", "SatCom Pro", "GIS Pro"],
    rates: { UJ: 91, KAUST: 95, KFUPM: 90, KSU: 88 },
  },
  {
    programAr: "السياحة والضيافة الدولية",
    category: "تخصصات المستقبل",
    careersAr: [
      "مدير منتجع دولي",
      "خبير ضيافة فاخرة",
      "منسق سياحة تراثية (عسير)",
    ],
    certificationsAr: [
      "Les Roches Hospitality",
      "CHA – Certified Hotel Administrator",
      "MoT Tourism License",
    ],
    rates: { KKU: 84, KAU: 86, UJ: 82, UQU: 80 },
  },
  {
    programAr: "هندسة الطاقة المتجددة",
    category: "تخصصات المستقبل",
    careersAr: [
      "مهندس مزارع شمسية",
      "مهندس طاقة رياح",
      "مدير مشاريع نيوم للطاقة",
    ],
    certificationsAr: ["NABCEP PV", "CEM", "PMP", "ISO 50001"],
    rates: { KKU: 89, KFUPM: 93, KAUST: 95, KAU: 88, UJ: 86 },
  },
];

async function main() {
  const existing = await db.select().from(universityProgramsTable);
  const existingByKey = new Map(
    existing.map((r) => [`${r.universityShort}::${r.programAr}`, r]),
  );

  let inserted = 0;
  let updated = 0;

  for (const p of PROGRAMS) {
    for (const [uniKey, rate] of Object.entries(p.rates)) {
      if (rate == null) continue;
      const uni = UNIS[uniKey as keyof typeof UNIS];
      const key = `${uni.short}::${p.programAr}`;
      const existing = existingByKey.get(key);

      if (existing) {
        await db
          .update(universityProgramsTable)
          .set({
            universityAr: uni.ar,
            careersAr: p.careersAr,
            certificationsAr: p.certificationsAr,
            admissionRate: rate,
            category: p.category,
          })
          .where(eq(universityProgramsTable.id, existing.id));
        updated++;
      } else {
        await db.insert(universityProgramsTable).values({
          universityAr: uni.ar,
          universityShort: uni.short,
          programAr: p.programAr,
          category: p.category,
          admissionRate: rate,
          careersAr: p.careersAr,
          certificationsAr: p.certificationsAr,
        });
        inserted++;
      }
    }
  }

  console.log(`Inserted: ${inserted}, Updated: ${updated}`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
