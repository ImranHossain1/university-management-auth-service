import { Model } from 'mongoose';
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  syncId: string;
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};
export type AcademicSemesterModel = Model<IAcademicSemester>;
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
