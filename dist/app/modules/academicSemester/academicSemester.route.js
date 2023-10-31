"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../middlewares/middleware"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/create-semester', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, middleware_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, middleware_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), academicSemester_controller_1.AcademicSemesterController.deleteSemester);
exports.AcademicSemesterRoutes = router;
