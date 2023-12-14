import { readStudentData, createStudentData, updateStudentData, deleteStudentData, readAllStudentsData, readAllCourseData, readCourseData, addCoursesData, updateCourseData, deleteCourseData } from '../api/Students';
import { studentModel, studentsModel, studentCourseModel, studentCoursesModel } from '../models/Students';


export const readAllStudents = async (): Promise<{ allStudents: Array<studentsModel> } | any> => {
  try {
    const response = await readAllStudentsData();

    if (Array.isArray(response.students)) {
      const allStudents: studentsModel[] = response.students.map((student: studentModel) => ({
        _id: student._id,
        program: student.program,
        year: student.year,
        semester: student.semester,
        block: student.block,
        courses: student.courses
      }));

    return { allStudents };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all students: ${error.message}`);
  }
}

export const readAllStudentCourses = async (getID: string): Promise<Array<studentCoursesModel> | any> => {
  try {
    const student: studentModel = { _id: getID };
    const response = await readAllCourseData(student);

    if (Array.isArray(response)) {
      const allCourses: studentCourseModel[] = response.map((course: studentCourseModel) => ({
        _id: course._id, 
        code: course.code,
        description: course.description,
        units: course.units,
        type: course.type
      }));

      return { allCourses };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}
