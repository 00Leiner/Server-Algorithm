
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData, addItemData } from './endpoints/Schedule';
import { OptionsScheduleModel, scheduleItemModel, scheduleItemsModel, scheduleModel, schedulesModel } from '../models/Schedule';

const baseUrl = 'http://localhost:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;
const addItemDataURL = `${baseUrl}${addItemData}`;

export const createOptionsScheduleData = async (scheduleData: OptionsScheduleModel): Promise<AxiosResponse<OptionsScheduleModel> | any> => {
    const response: AxiosResponse<OptionsScheduleModel> = await axios.post(createDataURL, scheduleData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const readAllScheduleData = async (): Promise<AxiosResponse<schedulesModel> | any> => {
    const response: AxiosResponse<schedulesModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readScheduleData = async (scheduleData: scheduleModel): Promise<AxiosResponse<schedulesModel> | any> => {
    const id = scheduleData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<schedulesModel>(url);

    if (response.status === 200) {
        return response.data.schedule;
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createScheduleData = async (scheduleData: scheduleModel): Promise<AxiosResponse<scheduleModel> | any> => {
    const response: AxiosResponse<scheduleModel> = await axios.post(createDataURL, scheduleData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateScheduleData = async (scheduleData: scheduleModel): Promise<AxiosResponse<scheduleModel> | any> => {
    const id = scheduleData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<scheduleModel> = await axios.put(url, scheduleData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Schedule not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteScheduleData = async (scheduleData: scheduleModel): Promise<AxiosResponse<scheduleModel> | any> => {
    const id = scheduleData._id
    const url = `${deleteDataURL}${id}`;

    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Schedule not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllItemData = async (scheduleData: scheduleModel): Promise<AxiosResponse<scheduleItemsModel> | any> => {
    const scheduleId = scheduleData._id;
    const url = `${readDataURL}program/block/schedule/${scheduleId}/courses/code`;
    const response: AxiosResponse<scheduleItemsModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.item)
        return response.data.sched;
        
    } else if (response.status === 404) {
        throw new Error(`No Items Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readItemData = async (scheduleData: scheduleModel, itemData: scheduleItemModel): Promise<AxiosResponse<scheduleItemModel> | any> => {
    const scheduleId = scheduleData._id
    const courseCode = itemData.courseCode
    const url = `${readDataURL}program/block/schedule/${scheduleId}/course/code/${courseCode}`;
    const response: AxiosResponse<scheduleItemsModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.sched)
        return response.data.sched;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const addItemsData = async (scheduleData: scheduleModel, itemData: scheduleItemModel): Promise<AxiosResponse<scheduleItemModel> | any> => {
    const scheduleId = scheduleData._id
    const url = `${addItemDataURL}${scheduleId}`;
    const response: AxiosResponse<scheduleItemsModel> = await axios.post(url, itemData);
    
    if (response.status === 200) {
        return response.data.sched;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const updateItemData = async (scheduleData: scheduleModel, itemData: scheduleItemModel): Promise<AxiosResponse<scheduleItemsModel> | any> => {
    const scheduleId = scheduleData._id
    const itemId = itemData._id
    const url = `${updateDataURL}program/block/course/schedule/${scheduleId}/course/code/${itemId}`;
    const response: AxiosResponse<scheduleItemsModel> = await axios.put(url, itemData);
    
    if (response.status === 200) {
        return response.data.sched;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteItemData = async (scheduleData: scheduleModel, itemData: scheduleItemModel): Promise<AxiosResponse<scheduleItemsModel> | any> => {
    const scheduleId = scheduleData._id
    const itemId = itemData._id
    const url = `${deleteDataURL}program/block/course/schedule/${scheduleId}/course/code/${itemId}`;
    const response: AxiosResponse<scheduleItemsModel> = await axios.delete(url);
    
    if (response.status === 200) {
        // console.log(response.data.sched)
        return response.data.sched;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};
