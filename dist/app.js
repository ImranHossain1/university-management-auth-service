"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
/* import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/user/user.utils'; */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', routes_1.default);
//global error handling
app.use(globalErrorHandler_1.default);
//handle notfound route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
/* const academicSemester = {
  code: '01',
  year: '2025',
};

const testId = async () => {
  const testId = await generateFacultyId();
  console.log(testId);
};
testId(); */
exports.default = app;
