export interface SchoolFeedbackType {
  _id?: number;
  date?: string;
  attendanceShared?: boolean;
  classActivityCompleted?: boolean;
  grade?: string;
  level?: string;
  lessonFeedbackShared?: boolean;
  mediaShared?: boolean;
  miniProjectorUsed?: boolean;
  schoolStatus: string;
  sel: boolean;
  studentsPresent?: number;
  teacherPresent?: boolean;
  comments?: string;
  issues?: string;
}
