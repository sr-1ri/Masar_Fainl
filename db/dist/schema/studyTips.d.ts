import { z } from "zod/v4";
export declare const studyTipsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "study_tips";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "study_tips";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        titleAr: import("drizzle-orm/pg-core").PgColumn<{
            name: "title_ar";
            tableName: "study_tips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        bodyAr: import("drizzle-orm/pg-core").PgColumn<{
            name: "body_ar";
            tableName: "study_tips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "study_tips";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 64;
        }>;
        durationMinutes: import("drizzle-orm/pg-core").PgColumn<{
            name: "duration_minutes";
            tableName: "study_tips";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertStudyTipSchema: z.ZodObject<{
    category: z.ZodString;
    titleAr: z.ZodString;
    bodyAr: z.ZodString;
    durationMinutes: z.ZodInt;
}, {
    out: {};
    in: {};
}>;
export type InsertStudyTip = z.infer<typeof insertStudyTipSchema>;
export type StudyTip = typeof studyTipsTable.$inferSelect;
//# sourceMappingURL=studyTips.d.ts.map