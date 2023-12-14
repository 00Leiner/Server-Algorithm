
import axios, { AxiosResponse } from 'axios';
import { readData } from './endpoints/Students';
import { studentCoursesModel, studentModel, studentsModel } from '../models/Students';

const baseUrl = 'http://localhost:3000';

const readDataURL = `${baseUrl}${readData}`;

export const readAllStudentsData = async (): Promise<AxiosResponse<studentsModel> | any> => {
    const response: AxiosResponse<studentsModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readStudentData = async (studentData: studentModel): Promise<AxiosResponse<studentsModel> | any> => {
    const id = studentData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<studentsModel>(url);

    if (response.status === 200) {
        return response.data.student;
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllCourseData = async (studentData: studentModel): Promise<AxiosResponse<studentCoursesModel> | any> => {
    const studentId = studentData._id;
    const url = `${readDataURL}student/${studentId}/courses`;
    const response: AxiosResponse<studentCoursesModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.courses;
        
    } else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};