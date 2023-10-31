"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Academic title is required',
        }),
        academicFacultyId: zod_1.z.string({
            required_error: 'Academic Faculty is required',
        }),
    }),
});
const updateAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        academicFacultyId: zod_1.z.string().optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentZodSchema,
    updateAcademicDepartmentZodSchema,
};
