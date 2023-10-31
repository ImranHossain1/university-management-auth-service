"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_STUDENT_UPDATED = exports.studentFilterableFields = exports.studentSearchableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-'];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'gender',
    'bloodGroup',
    'contactNo',
    'emergencyContactNo',
];
exports.EVENT_STUDENT_UPDATED = 'student.updated';
