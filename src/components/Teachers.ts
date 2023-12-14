import { readTeacherData, createTeacherData, updateTeacherData, deleteTeacherData, readAllTeachersData, readAllCourseData, readCourseData, addCoursesData, deleteCourseData, updateCourseData } from '../api/Teachers';
import { teacherCourseModel, teacherCoursesModel, teacherModel, teachersModel } from '../models/Teachers';


export const readAllTeachers = async (): Promise<{ allTeachers: Array<teachersModel> } | any> => {
  try {
    const response = await readAllTeachersData();

    if (Array.isArray(response.teachers)) {
      const allTeachers = response.teachers.map((teacher: teacherModel) => ({
        _id: teacher._id,
        name: teacher.name,
        specialized: teacher.specialized
      }));

    return { allTeachers };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all teachers: ${error.message}`);
  }
}

export const readTeacher = async (getID: string): Promise<teachersModel | any> => {
  try {
    const teacher: teacherModel = { _id: getID };
    const response: teachersModel = await readTeacherData(teacher);

    const _id = response.teacher._id;
    const name = response.teacher.name;
    const specialized = response.teacher.specialized;

    return { _id, name, specialized };
    


  } catch (error: any) {
    console.error(`Failed to read teacher: ${error.message}`);
  }
};

export const createTeacher = async (getName: string, getSpecialized: any) => {
  const newTeacher: teacherModel = {
    name: getName,
    specialized: getSpecialized,
  };
  try {
    const response = await createTeacherData(newTeacher);
    console.log(`Teacher created successfully:`, response);
    return response.teacher;
  } catch (error: any) {
    console.error(`Failed to delete teacher: ${error.message}`);
  }
};

export const updateTeacher = async (getID: string, getName: string, getSpecialized: any) => {
  const newTeacher: teacherModel = {
    _id: getID,
    name: getName,
    specialized: getSpecialized
  };
  try {
    const response = await updateTeacherData(newTeacher);
    console.log(`Teacher update successfully:`, response);
    return response.teachers;

  } catch (error: any) {
    console.error(`Failed to update teacher: ${error.message}`);
  }
};

export const deleteTeacher = async (getID: string) => {
  const newTeacher: teacherModel = {
    _id: getID
  };
  try {
    const response = await deleteTeacherData(newTeacher);
    console.log('Teacher Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete teacher: ${error.message}`);
  }
};

export const readAllTeacherCourses = async (getID: string): Promise<Array<teacherCoursesModel> | any> => {
  try {
    const teacher: teacherModel = { _id: getID };
    const response = await readAllCourseData(teacher);

    if (Array.isArray(response)) {
      const allCourses: teacherCourseModel[] = response.map((course: teacherCourseModel) => ({
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

export const readTeacherCourse = async (getTeacherID: string, getCourseCourse: string): Promise<teacherCourseModel | any> => {
  try {
    const teacher: teacherModel = { _id: getTeacherID };
    const course: teacherModel = { _id: getCourseCourse };
    const response = await readCourseData(teacher, course);

    const _id = response.course._id;
    const code = response.course.code;
    const description = response.course.description; 
    const units = response.course.units;
    const type = response.course.type;

    return { _id, code, description, units, type };

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const addTeacherCourse = async (getTeacherID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const teacher: teacherModel = { _id: getTeacherID };
  const newCourse: teacherCourseModel = {
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  try {
    const response = await addCoursesData(teacher, newCourse);
    console.log(`Teacher created successfully:`, response);
    return response.teacher;
  } catch (error: any) {
    console.error(`Failed to delete teacher: ${error.message}`);
  }
};

export const updateTeacherCourse = async (getTeacherID: string, getID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const teacher: teacherModel = { _id: getTeacherID };
  const newCourse: teacherCourseModel = {
    _id: getID,
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  
  try {
    const response: teacherCourseModel[] = await updateCourseData(teacher, newCourse);
    
    if (response.length > 0) {
      const updatedCourse = response.find(course => course._id === getID);

      if (updatedCourse) {
        console.log(`Course update successfully:`, updatedCourse);
        return updatedCourse
      } else {
        console.log(`Updated course not found.`);
      }
    } else {
      console.log(`No courses found for the teacher.`);
    }

    
  } catch (error: any) {
    console.error(`Failed to update course: ${error.message}`);
  }
};

export const deleteTeacherCourses = async (getTeacherID: string, getCourseId: string): Promise<teacherCourseModel | null> => {
  const teacher: teacherModel = { _id: getTeacherID };
  const course: teacherModel = { _id: getCourseId };

  try {
    const deletedCourse: teacherCourseModel | null = await deleteCourseData(teacher, course);

    console.log('Course Deleted!', deletedCourse);
    return deletedCourse;
    
  } catch (error: any) {
    console.error(`Failed to delete course: ${error.message}`);
    throw error; // Re-throw the error to let the caller handle it
  }
};
