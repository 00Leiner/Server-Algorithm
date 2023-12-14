import { readRoomData, createRoomData, updateRoomData, deleteRoomData, readAllRoomsData } from '../api/Rooms';
import { roomModel, roomsModel } from '../models/Rooms';


export const readAllRooms = async (): Promise<{ allRooms: Array<roomsModel> } | any> => {
  try {
    const response = await readAllRoomsData();

    if (Array.isArray(response.rooms)) {
      const allRooms = response.rooms.map((room: roomModel) => ({
        _id: room._id,
        name: room.name,
        type: room.type
      }));

    return { allRooms };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all rooms: ${error.message}`);
  }
}
