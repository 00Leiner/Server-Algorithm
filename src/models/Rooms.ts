export interface roomModel {
  _id?: string;
  name?: string;
  type?: string;
}
export interface roomsModel {
  room: roomModel;
}