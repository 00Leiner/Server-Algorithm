
import axios, { AxiosResponse } from 'axios';
import { readData } from './endpoints/Rooms';
import { roomsModel } from '../models/Rooms';

const baseUrl = 'http://localhost:3000';

const readDataURL = `${baseUrl}${readData}`;

export const readAllRoomsData = async (): Promise<AxiosResponse<roomsModel> | any> => {
    const response: AxiosResponse<roomsModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Room Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};