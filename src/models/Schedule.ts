export interface scheduleItemModel{
    _id?: string;
    courseCode?: string,
    courseDescription?: string,
    courseUnit?: string,
    day?: string,
    time?: string, 
    room?: string,
    instructor?: string,
  }

export interface scheduleItemsModel{
    sched?: scheduleItemModel
  }

export interface scheduleModel{
  _id?: string,
  program?: string;
  year?: string;
  semester?: string;
  block?: string;
  sched?: scheduleItemModel;
};

export interface schedulesModel {
  schedule?: scheduleModel;
}