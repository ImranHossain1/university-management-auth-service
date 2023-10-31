"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_FACULTY_UPDATED = exports.facultySearchableFields = exports.facultyFilterableFields = void 0;
//for exact match
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
    'designation',
];
// it will match partially
exports.facultySearchableFields = [
    'email',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
exports.EVENT_FACULTY_UPDATED = 'faculty.updated';
