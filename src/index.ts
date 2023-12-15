import { createOptionsSchedule, createSchedule } from './components/Schedule';
import {  OptionsScheduleModel, scheduleItemModel, scheduleModel } from './models/Schedule';

export class Schedules{
    async create(
        getOprions: string, 
        getPrograms: any
        ){
        const response = await createOptionsSchedule(
            getOprions, 
            getPrograms
            );
        return response
    }
}


async function approach() {

  /* const schedule = new Schedules()
    
    //create schedule
    const create = await schedule.create(
        'option1',
        [
            {
                program: 'BSCS',//program
                year: '3', // year
                semester: '2', //semester
                block: 'B', //block
                sched: [
                    {
                        courseCode: 'course1',
                        courseDescription: 'course number 1',
                        courseUnit: '3',
                        day: 'monday',
                        time: '7am-8am', 
                        room: 'room1',
                        instructor: 'teacher1',
                    },
                    {
                        courseCode: 'course2',
                        courseDescription: 'course number 2',
                        courseUnit: '2',
                        day: 'tuesday',
                        time: '7am-8am', 
                        room: 'room2',
                        instructor: 'teacher2',
                    }
                ]
            },
        ]
        )
    console.log(create)//program, year, semester, block, sched
 */
}

approach()