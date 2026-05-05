import {
  db,
  specializationsTable,
  studyTipsTable,
  type InsertSpecialization,
  type InsertStudyTip,
  pool,
} from "@workspace/db";

const specializations: InsertSpecialization[] = [
  {
    nameAr: "هندسة البرمجيات",
    category: "هندسة وحاسب",
    descriptionAr:
      "تصميم وتطوير الأنظمة والتطبيقات البرمجية مع التركيز على جودة الكود وأمن المعلومات.",
    topUniversitiesAr: [
      "جامعة الملك فهد للبترول والمعادن",
      "جامعة الملك سعود",
      "جامعة الملك خالد",
      "جامعة الملك عبدالله للعلوم والتقنية",
    ],
    careerPathsAr: [
      "مطوّر تطبيقات",
      "مهندس برمجيات في شركات التقنية الكبرى",
      "ريادة أعمال في القطاع الرقمي",
    ],
    demandLevel: "very_high",
  },
  {
    nameAr: "الذكاء الاصطناعي وعلوم البيانات",
    category: "هندسة وحاسب",
    descriptionAr:
      "بناء نماذج تعلم آلي وتحليل البيانات الضخمة لاتخاذ قرارات ذكية في مختلف القطاعات.",
    topUniversitiesAr: [
      "جامعة الملك عبدالله للعلوم والتقنية",
      "جامعة الملك سعود",
      "جامعة الملك خالد",
      "جامعة الأمير محمد بن سلمان",
    ],
    careerPathsAr: [
      "عالم بيانات",
      "مهندس تعلم آلي",
      "مستشار تحول رقمي",
    ],
    demandLevel: "very_high",
  },
  {
    nameAr: "الأمن السيبراني",
    category: "هندسة وحاسب",
    descriptionAr:
      "حماية الأنظمة والشبكات والبيانات من التهديدات الرقمية في القطاعين العام والخاص.",
    topUniversitiesAr: [
      "جامعة الملك سعود",
      "جامعة نايف العربية للعلوم الأمنية",
      "جامعة الأميرة نورة",
    ],
    careerPathsAr: [
      "محلل أمن معلومات",
      "مختبر اختراق",
      "مدير أمن سيبراني",
    ],
    demandLevel: "very_high",
  },
  {
    nameAr: "نظم المعلومات الإدارية",
    category: "هندسة وحاسب",
    descriptionAr:
      "حلقة الوصل بين التقنية والأعمال، تدير الأنظمة الرقمية للمنظمات وتحلل احتياجاتها.",
    topUniversitiesAr: [
      "جامعة الملك خالد",
      "جامعة الملك سعود",
      "جامعة الملك عبدالعزيز",
    ],
    careerPathsAr: [
      "محلل نظم",
      "مدير مشاريع تقنية",
      "مستشار تحول رقمي",
    ],
    demandLevel: "high",
  },
  {
    nameAr: "هندسة الطيران والفضاء",
    category: "هندسة",
    descriptionAr:
      "تصميم الطائرات والمركبات الفضائية والأنظمة المرتبطة بها — قطاع صاعد بقوة في رؤية 2030.",
    topUniversitiesAr: [
      "جامعة الملك عبدالعزيز",
      "جامعة الملك فهد للبترول والمعادن",
      "كلية الملك فيصل الجوية",
    ],
    careerPathsAr: [
      "مهندس طائرات",
      "الهيئة العامة للطيران المدني",
      "شركات الفضاء السعودية الناشئة",
    ],
    demandLevel: "high",
  },
  {
    nameAr: "علوم البحار",
    category: "علوم طبيعية",
    descriptionAr:
      "دراسة البيئات البحرية والثروة السمكية واستدامة سواحل المملكة على البحر الأحمر والخليج العربي.",
    topUniversitiesAr: [
      "جامعة الملك عبدالعزيز",
      "جامعة الملك عبدالله للعلوم والتقنية",
    ],
    careerPathsAr: [
      "باحث بيئة بحرية",
      "مشاريع نيوم والبحر الأحمر",
      "هيئات الثروة السمكية",
    ],
    demandLevel: "medium",
  },
  {
    nameAr: "هندسة البترول",
    category: "هندسة",
    descriptionAr:
      "استكشاف وإنتاج النفط والغاز، أحد أعمدة الاقتصاد السعودي.",
    topUniversitiesAr: [
      "جامعة الملك فهد للبترول والمعادن",
      "جامعة الملك سعود",
    ],
    careerPathsAr: ["مهندس حقول", "مهندس حفر", "أرامكو السعودية"],
    demandLevel: "high",
  },
  {
    nameAr: "الطب البشري",
    category: "صحة",
    descriptionAr:
      "تشخيص وعلاج الأمراض، مع تخصصات دقيقة متعددة في المرحلة العليا.",
    topUniversitiesAr: [
      "جامعة الملك سعود",
      "جامعة الملك عبدالعزيز",
      "جامعة الإمام عبدالرحمن بن فيصل",
    ],
    careerPathsAr: ["طبيب عام", "استشاري", "بحث طبي"],
    demandLevel: "high",
  },
  {
    nameAr: "إدارة الأعمال",
    category: "أعمال",
    descriptionAr:
      "إدارة المنظمات والموارد، مع مسارات في التسويق والمالية والموارد البشرية.",
    topUniversitiesAr: [
      "جامعة الملك سعود",
      "جامعة الملك فهد للبترول والمعادن",
      "كلية الأمير محمد بن سلمان للإدارة",
    ],
    careerPathsAr: [
      "مدير مشاريع",
      "محلل أعمال",
      "ريادة أعمال",
    ],
    demandLevel: "high",
  },
  {
    nameAr: "التصميم والإعلام الرقمي",
    category: "فنون وإعلام",
    descriptionAr:
      "تصميم تجارب رقمية وبصرية للمنتجات والمحتوى الإعلامي الحديث.",
    topUniversitiesAr: [
      "جامعة عفت",
      "جامعة الأميرة نورة",
      "جامعة دار الحكمة",
    ],
    careerPathsAr: [
      "مصمم تجربة مستخدم",
      "مخرج محتوى رقمي",
      "مدير علامة تجارية",
    ],
    demandLevel: "medium",
  },
  {
    nameAr: "القانون",
    category: "علوم إنسانية",
    descriptionAr:
      "دراسة الأنظمة والتشريعات السعودية والدولية، مع تطبيقات في المحاماة والقضاء والاستشارات.",
    topUniversitiesAr: [
      "جامعة الملك سعود",
      "جامعة الإمام محمد بن سعود",
      "جامعة الملك عبدالعزيز",
    ],
    careerPathsAr: ["محامي", "مستشار قانوني", "النيابة العامة"],
    demandLevel: "medium",
  },
];

const studyTips: InsertStudyTip[] = [
  {
    titleAr: "تقنية بومودورو السعودية",
    bodyAr:
      "ركّز ٢٥ دقيقة بدون أي مشتتات، ثم خذ استراحة ٥ دقائق لشرب القهوة العربية أو المشي. كرّر ٤ مرات ثم خذ استراحة طويلة ١٥-٣٠ دقيقة. هذه التقنية تحافظ على تركيزك وتمنع الإرهاق الذهني.",
    category: "إدارة وقت",
    durationMinutes: 25,
  },
  {
    titleAr: "خرائط المفاهيم البصرية",
    bodyAr:
      "ارسم المفهوم الرئيسي في المنتصف ثم تفرّع منه إلى المفاهيم الفرعية بألوان مختلفة. هذه الطريقة فعّالة جداً للمواد التي تحتاج فهماً عميقاً مثل الأحياء والكيمياء والتاريخ.",
    category: "استذكار نشط",
    durationMinutes: 40,
  },
  {
    titleAr: "التسميع الذاتي بصوت عالٍ",
    bodyAr:
      "بعد قراءة الدرس، أغلق الكتاب وتحدّث عن المحتوى وكأنك تشرحه لزميل. هذه التقنية (تسمى Feynman Technique) تكشف نقاط الضعف فوراً وترسّخ المعلومة في ذاكرتك طويلة المدى.",
    category: "استذكار نشط",
    durationMinutes: 20,
  },
  {
    titleAr: "المراجعة المتباعدة",
    bodyAr:
      "راجع المادة بعد يوم، ثم بعد ٣ أيام، ثم بعد أسبوع، ثم بعد شهر. هذا الجدول يستغل منحنى النسيان ويثبّت المعلومات في الذاكرة طويلة المدى استعداداً للاختبارات النهائية.",
    category: "إدارة وقت",
    durationMinutes: 30,
  },
  {
    titleAr: "حلّ نماذج اختبارات سابقة",
    bodyAr:
      "خصّص جلسة كاملة لحلّ نماذج قدرات أو تحصيلي أو اختبارات سابقة في نفس ظروف الاختبار الحقيقي. حلّل أخطاءك بعدها — كل خطأ هو فرصة تعلّم.",
    category: "تحضير اختبارات",
    durationMinutes: 90,
  },
  {
    titleAr: "تجميع المواد المتشابهة",
    bodyAr:
      "ادرس المواد العلمية في الصباح حين يكون التركيز في ذروته، واترك المواد التي تحتاج حفظاً للمساء. لا تخلط بين مادتين متشابهتين في نفس الجلسة لتجنب التداخل الذهني.",
    category: "إدارة وقت",
    durationMinutes: 60,
  },
];

async function main() {
  const existingSpecs = await db.select().from(specializationsTable);
  const existingNames = new Set(existingSpecs.map((s) => s.nameAr));
  const newSpecs = specializations.filter((s) => !existingNames.has(s.nameAr));
  if (newSpecs.length > 0) {
    await db.insert(specializationsTable).values(newSpecs);
    console.log(`Inserted ${newSpecs.length} new specializations`);
  } else {
    console.log("All specializations already present");
  }

  const existingTips = await db.select().from(studyTipsTable);
  const existingTitles = new Set(existingTips.map((t) => t.titleAr));
  const newTips = studyTips.filter((t) => !existingTitles.has(t.titleAr));
  if (newTips.length > 0) {
    await db.insert(studyTipsTable).values(newTips);
    console.log(`Inserted ${newTips.length} new study tips`);
  } else {
    console.log("All study tips already present");
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
