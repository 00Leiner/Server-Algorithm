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
    deleteItemData
} from '../api/Schedule';
import { scheduleModel, schedulesModel, scheduleItemModel, scheduleItemsModel } from '../models/Schedule';

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