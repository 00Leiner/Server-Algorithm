import axios, { AxiosResponse } from 'axios';
import { readData } from './endpoints/Teachers';
import { teacherCoursesModel, teacherModel, teachersModel } from '../models/Teachers';

const baseUrl = 'http://localhost:3000';

const readDataURL = `${baseUrl}${readData}`;

export const readAllTeachersData = async (): Promise<AxiosResponse<teachersModel> | any> => {
    const response: AxiosResponse<teachersModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readTeacherData = async (teacherData: teacherModel): Promise<AxiosResponse<teachersModel> | any> => {
  
    const id = teacherData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<teachersModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllCourseData = async (teacherData: teacherModel): Promise<AxiosResponse<teacherCoursesModel> | any> => {
    const teacherId = teacherData._id;
    const url = `${readDataURL}teacher/${teacherId}/courses`;
    const response: AxiosResponse<teacherCoursesModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.courses;
        
    } else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};