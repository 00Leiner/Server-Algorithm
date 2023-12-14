export interface studentCourseModel{
    _id?: string;
    code?: string;
    description?: string;
    units?: string;
    type?: string;
  }

export interface studentCoursesModel{
    courses?: studentCourseModel
  }

export interface studentModel{
  _id?: string,
  program?: string;
  year?: string;
  semester?: string;
  block?: string;
  courses?: studentCourseModel;
};

export interface studentsModel {
  student?: studentModel;
}