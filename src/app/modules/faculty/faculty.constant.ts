//for exact match
export const facultyFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
  'designation',
];
// it will match partially
export const facultySearchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
