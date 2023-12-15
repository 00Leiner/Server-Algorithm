import { 
    readAllScheduleData,
    readScheduleData, 
    createScheduleData, 
    updateScheduleData, 
    deleteScheduleData,
    readAllItemData,
    readItemData,
    addItemsData,
    updateItemData,
    deleteItemData,
    createOptionsScheduleData
} from '../api/Schedule';
import { scheduleModel, schedulesModel, scheduleItemModel, scheduleItemsModel, OptionsScheduleModel } from '../models/Schedule';


export const createOptionsSchedule = async (
  getOptions: string,
  getPrograms: any) => {
  const newoptionsSchedule: OptionsScheduleModel = {
    options: getOptions,
    programs: getPrograms,
  };
  try {
    const response = await createOptionsScheduleData(newoptionsSchedule);
    console.log(`Schedule created successfully:`, response.schedule);
    return response.schedule;
  } catch (error: any) {
    console.error(`Failed to delete schedule: ${error.message}`);
  }
};

export const readAllSchedules = async (): Promise<{ allSchedules: Array<schedulesModel> } | any> => {
  try {
    const response = await readAllScheduleData();

    if (Array.isArray(response.schedules)) {
      const allSchedules: schedulesModel[] = response.schedules.map((schedule: scheduleModel) => ({
        _id: schedule._id,
        program: schedule.program,
        year: schedule.year,
        semester: schedule.semester,
        block: schedule.block,
        sched: schedule.sched
      }));

    return { allSchedules };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all schedules: ${error.message}`);
  }
}

export const readSchedule = async (getID: string): Promise<scheduleModel | any> => {
  try {
    const schedule: scheduleModel = { _id: getID };
    const response: scheduleModel = await readScheduleData(schedule);

    const _id = response._id;
    const program = response.program;
    const year = response.year;
    const semester = response.semester;
    const block = response.block;
    const sched = response.sched;

    return { _id, program, year, semester, block, sched };
    
  } catch (error: any) {
    console.error(`Failed to read schedule: ${error.message}`);
  }
};

export const createSchedule = async (
  getProgram: string, 
  getYear: string, 
  getSemester: string, 
  getBlock: string, 
  getItems: any) => {
  const newSchedule: scheduleModel = {
    program: getProgram,
    year: getYear,
    semester: getSemester,
    block: getBlock,
    sched: getItems
  };
  try {
    const response = await createScheduleData(newSchedule);
    console.log(`Schedule created successfully:`, response.schedule);
    return response.schedule;
  } catch (error: any) {
    console.error(`Failed to delete schedule: ${error.message}`);
  }
};

export const updateSchedule = async (
  getID: string, 
  getProgram: string, 
  getYear: string, 
  getSemester: string, 
  getBlock: string, 
  getItems: any) => {
  const newSchedule: scheduleModel = {
    _id: getID,
    program: getProgram,
    year: getYear,
    semester: getSemester,
    block: getBlock,
    sched: getItems
  };
  try {
    const response = await updateScheduleData(newSchedule);
    console.log(`Schedule update successfully:`, response.schedules);
    return response.schedules;

  } catch (error: any) {
    console.error(`Failed to update schedule: ${error.message}`);
  }
};

export const deleteSchedule = async (getID: string) => {
  const newSchedule: scheduleModel = {
    _id: getID
  };
  try {
    const response = await deleteScheduleData(newSchedule);
    console.log('Schedule Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete schedule: ${error.message}`);
  }
};

export const readAllScheduleItems = async (getID: string): Promise<Array<scheduleItemsModel> | any> => {
  try {
    const schedule: scheduleModel = { _id: getID };
    const response = await readAllItemData(schedule);

    if (Array.isArray(response)) {
      const allItems: scheduleItemModel[] = response.map((sched: scheduleItemModel) => ({
        _id: sched._id,
        courseCode: sched.courseCode,
        courseDescription: sched.courseDescription,
        courseUnit: sched.courseUnit,
        day: sched.day,
        time: sched.time,
        room: sched.room,
        instructor: sched.instructor,
      }));

      return { allItems };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const readScheduleItem = async (getScheduleID: string, getItemID: string): Promise<scheduleItemModel | any> => {
  try {
    const schedule: scheduleModel = { _id: getScheduleID };
    const course: scheduleItemModel = { courseCode: getItemID };
    const response = await readItemData(schedule, course);

    const _id = response._id;
    const courseCode = response.courseCode;
    const courseDescription = response.courseDescription; 
    const courseUnit = response.courseUnit;
    const day = response.day;
    const time = response.time;
    const room = response.room;
    const instructor = response.instructor;

    return { _id, courseCode, courseDescription, courseUnit, day, time, room, instructor };

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const addScheduleItem = async (getScheduleID: string, getCourseCode: string, getCourseDescription: string, getCourseUnits: string, getDay: string, geTime: string, getRoom: string, getInstructor: string) => {
  const schedule: scheduleModel = { _id: getScheduleID };
  const newItem: scheduleItemModel = {
    courseCode: getCourseCode,
    courseDescription: getCourseDescription,
    courseUnit: getCourseUnits,
    day: getDay,
    time: geTime,
    room: getRoom,
    instructor: getInstructor,
  };
  try {
    const response = await addItemsData(schedule, newItem);
    console.log(`Schedule item created successfully:`, response.sched);
    return response;
  } catch (error: any) {
    console.error(`Failed to delete schedule: ${error.message}`);
  }
};

export const updateScheduleItem = async (getScheduleID: string, getID: string, getCourseCode: string, getCourseDescription: string, getCourseUnits: string, getDay: string, geTime: string, getRoom: string, getInstructor: string) => {
  const schedule: scheduleModel = { _id: getScheduleID };
  const newItem: scheduleItemModel = {
    _id: getID,
    courseCode: getCourseCode,
    courseDescription: getCourseDescription,
    courseUnit: getCourseUnits,
    day: getDay,
    time: geTime,
    room: getRoom,
    instructor: getInstructor,
  };
  
  try {
    const response: scheduleItemModel[] = await updateItemData(schedule, newItem);
    
    if (response.length > 0) {
      const updatedItem = response.find(course => course._id === getID);

      if (updatedItem) {
        console.log(`Item update successfully:`, updatedItem);
        return updatedItem
      } else {
        console.log(`Updated course not found.`);
      }
    } else {
      console.log(`No courses found for the schedule.`);
    }

    
  } catch (error: any) {
    console.error(`Failed to update course: ${error.message}`);
  }
};

export const deleteScheduleItems = async (getScheduleID: string,  getItemId: string): Promise<{ courses: Array<scheduleItemsModel> } | any> => {
  
    const schedule: scheduleModel = { _id: getScheduleID };
    const course: scheduleModel = { _id: getItemId };
  
    try {
      const response: scheduleItemModel | null = await deleteItemData(schedule, course);

      console.log('Course Schedule Deleted!', response);
      return response;
      
    } catch (error: any) {
      console.error(`Failed to delete course: ${error.message}`);
      throw error; 
    }
};