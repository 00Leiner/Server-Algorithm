
import axios, { AxiosResponse } from 'axios';
import { createData } from './endpoints/Schedule';
import { scheduleModel } from '../models/Schedule';

const baseUrl = 'http://localhost:3000';

const createDataURL = `${baseUrl}${createData}`;

export const createScheduleData = async (scheduleData: scheduleModel): Promise<AxiosResponse<scheduleModel> | any> => {
    const response: AxiosResponse<scheduleModel> = await axios.post(createDataURL, scheduleData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};