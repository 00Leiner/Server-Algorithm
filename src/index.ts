import { readAllRooms } from './components/Rooms';
import { createSchedule } from './components/Schedule';
import { readAllStudents, readAllStudentCourses } from './components/Students';
import { readAllTeachers } from './components/Teachers';
import { roomModel } from './models/Rooms';
import {  scheduleItemModel } from './models/Schedule';
import { studentCourseModel, studentModel } from './models/Students';
import { teacherModel } from './models/Teachers';

export class Teachers{
    async readAll() {
        const teacherList = await readAllTeachers();

        if (teacherList && teacherList.allTeachers) {
            const allTeacherDetails = teacherList.allTeachers.map((teacher: teacherModel) => {
                const _id = teacher._id;
                const name = teacher.name;
                const specialized = teacher.specialized;
                return { _id, name, specialized };
        });
            return allTeacherDetails;

        } else {
            console.error('Failed to fetch teacher data or no teachers found.');
        }
    }
}

export class Rooms{
    async readAll() {
        const roomList = await readAllRooms();

        if (roomList && roomList.allRooms) {
            const allRoomDetails = roomList.allRooms.map((room: roomModel) => {
                const _id = room._id;
                const name = room.name;
                const type = room.type;
                return { _id, name, type };
        });
            return allRoomDetails;

        } else {
            console.error('Failed to fetch room data or no rooms found.');
        }
    }
}

export class Students{
    async readAll() {
        const studentList = await readAllStudents();

        if (studentList && studentList.allStudents) {
            const allStudentDetails = studentList.allStudents.map((student: studentModel) => {
                const _id = student._id;
                const program = student.program;
                const year = student.year;
                const semester = student.semester;
                const block = student.block;
                const courses = student.courses;

                return { _id, program, year, semester, block, courses };
        });
            return allStudentDetails;

        } else {
            console.error('Failed to fetch student data or no students found.');
        }
    }

    async readAllCourses(getID: string) {
        const courseList = await readAllStudentCourses(getID);

        if (courseList && courseList.allCourses) {
            const allCourseDetails = courseList.allCourses.map((course: studentCourseModel) => {
                const _id = course._id;
                const code = course.code;
                const description = course.description;
                const units = course.units;
                const type = course.type;

                return { _id, code, description, units, type };
        });
            return allCourseDetails;

        } else {
            console.error('Failed to fetch course data or no courses found.');
        }
    }
}

export class Schedules{
    async create(
        getProgram: string, 
        getYear: string, 
        getSemester: string, 
        getBlock: string, 
        getItems: scheduleItemModel[]
        ){
        const response = await createSchedule(
            getProgram, 
            getYear, 
            getSemester, 
            getBlock, 
            getItems
            );
        return response
    }
}


async function approach() {
    //user, teacher, rooms, courses has the same approach

/*  const teacher = new Teachers();
    
    // //read a single teacher
    // const read = await teacher.read('655e35a67c3c3cca9a957b20');//id
    // console.log(read)//  _id, name, specialized

    // //read all teacher
    // const readAll = await teacher.readAll()
    // if (readAll) {
    //     //read id 
    //     console.log('User IDs:', readAll.map((teacher: teacherModel) => teacher._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create teacher
    // const create = await teacher.create('teacher2', 'english')//  name, specialized
    // console.log(create)// _id, name, specialized

    // //update teacher
    // const update = await teacher.update( '6564e365bf64d6840d2b62e0', 'leiner2', 'science')// _id, name, specialized
    // console.log(update) // _id, name, specialized

    // //delete teacher
    // const del = await teacher.delete( '6564e365bf64d6840d2b62e0') //id you want to delete
*/

/*  const room = new Rooms();
    
    // //read a single teacher
    // const read = await room.read('655e3853cdba379e4dc7acff'); //_id, name, type
    // console.log(read)//_id, name, type

    // // read all room
    // const readAll = await room.readAll()
    // if (readAll) {
    //     //read id 
    //     console.log('User IDs:', readAll.map((room: roomModel) => room._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create room
    // const create = await room.create('roo3', 'lab')// name, type
    // console.log(create)//name, type

    // //update room
    // const update = await room.update( '6564ec8a4701fb0526023e3d', 'room3', 'lab')//_id, name, type
    // console.log(update)//_id, name, type 

    // //delete room
    // const del = await room.delete( '6564ec8a4701fb0526023e3d') //_id */
  
 /*    const student = new Students()
    // //read a single student
    // const read = await student.read('65683b2f8c072cc2269bdaf9'); //id
    // console.log(read.courses)//you can get any information inside student's data (e.g, id, program, year, semester, block, courses)

    // // read all student
    // const readAll = await student.readAll() // can be use in the listing and to get the data of every program block exist on the database
    // //use this kind of approach to get what you need
    // if (readAll) {
    //     //read id 
    //     console.log('User IDs:', readAll.map((student: studentModel) => student._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create student
    // const create = await student.create(
    //     'BSCS', //program
    //     '2', // year
    //     '1', //semester
    //     'D', //block
    //     [
    //         {
    //             code: 'course1', 
    //             description: 'course number 1', 
    //             units: '3', 
    //             type: 'lab'
    //         },
    //         {
    //             code: 'course2', 
    //             description: 'course number 2', 
    //             units: '3', 
    //             type: 'lab'
    //         },
    //         {
    //             code: 'course3', 
    //             description: 'course number 2', 
    //             units: '3', 
    //             type: 'lab'
    //         }
    //     ]
    //     )
    // console.log(create.courses) ////you can get any information inside student's data you've created  (e.g, id, program, year, semester, block, courses)

    // //update student
    // const update = await student.update(
    //     '65683b2f8c072cc2269bdaf9',// id you want to update
    //     'BSCS', //program
    //     '4', // year
    //     '2', //semester
    //     'C', //block
    //     [
    //         {
    //             code: 'course 1', 
    //             description: 'course number 1', 
    //             units: '3', 
    //             type: 'lab'
    //         },
    //         {
    //             code: 'course 2', 
    //             description: 'course number 2', 
    //             units: '3', 
    //             type: 'lab'
    //         }
    //     ]
    //     )
    // console.log(update)//you can get any information inside student's data you updated  (e.g, id, program, year, semester, block, courses)

    // //delete student
    // const del = await student.delete( '65683b2f8c072cc2269bdaf9')  // id you want to delete

    // //read a single course
    // const readCourse = await student.readCourse(
    //     '656abfb4c8f7d89bbf7748d6', // id of the programblock that has the course's data you want to get the value 
    //     'course1' // CourseCode of the course you want to read
    //     );
    // console.log(readCourse)//you can get any information inside student's course data you want to get  (e.g, code, description, units, type )

    // read all course
    // const readAllCourses = await student.readAllCourses('656abfb4c8f7d89bbf7748d6')// the id of the student's courses you want to get
    // //same approach of read all student data
    // if (readAllCourses) {
    //     //read id 
    //     console.log('User IDs:', readAllCourses.map((course: courseModel) => course._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create course
    // const addCourse = await student.addCourse(
    //     '656abfb4c8f7d89bbf7748d6', //student id where you want to add course
    //     'course4', // course code
    //     'course number 2', // course description
    //     '3', //units
    //     'lab'//type
    //     )
    // console.log(addCourse)

    // //update course
    // const updateCourse = await student.updateCourse(
    //     '656abfb4c8f7d89bbf7748d6', // student id
    //     '656ac448fb46bfeb8f588451', // course id
    //     'course4', //course code
    //     'course number 4', //course description
    //     '3', // unit
    //     'lab'// type
    //     )
    // console.log(updateCourse?.code)//you can get any information inside student's course data you want to update  (e.g, code, description, units, type )


    // //delete course
    // const del = await student.deleteCourse( 
    //     '656abfb4c8f7d89bbf7748d6', // student id
    //     '656ac8abfb46bfeb8f5884a7' //course id
    //     )   
    */

/*     const schedule = new Schedules()
    // same approach as student

    // //read a single schedule
    // const read = await schedule.read('655e3d2a9dd0ed242055f1a2');//schedule id
    // console.log(read.sched)//program, year, semester, block, sched

    // // read all schedule
    // const readAll = await schedule.readAll()
    // if (readAll) {
    //     //read id 
    //     console.log('User IDs:', readAll.map((sched: scheduleItemModel) => sched._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create schedule
    // const create = await schedule.create(
    //     'BSCS',//program
    //     '3', // year
    //     '2', //semester
    //     'B', //block
    //     [
    //         {
    //             courseCode: 'course1',
    //             courseDescription: 'course number 1',
    //             courseUnit: '3',
    //             day: 'monday',
    //             time: '7am-8am', 
    //             room: 'room1',
    //             instructor: 'teacher1',
    //         },
    //         {
    //             courseCode: 'course2',
    //             courseDescription: 'course number 2',
    //             courseUnit: '2',
    //             day: 'tuesday',
    //             time: '7am-8am', 
    //             room: 'room2',
    //             instructor: 'teacher2',
    //         }
    //     ]
    //     )
    // console.log(create)//program, year, semester, block, sched

    // //update schedule
    // const update = await schedule.update(
    //     '656ad2c4fb46bfeb8f5884ca',// schedule id to update
    //     'BSCS',//program
    //     '5', // year
    //     '2', //semester
    //     'B', //block
    //     [
    //         {
    //             courseCode: 'course 1',
    //             courseDescription: 'course number 1',
    //             courseUnit: '3',
    //             day: 'monday',
    //             time: '7am-8am', 
    //             room: 'room1',
    //             instructor: 'teacher1',
    //         },
    //         {
    //             courseCode: 'course 2',
    //             courseDescription: 'course number 2',
    //             courseUnit: '2',
    //             day: 'tuesday',
    //             time: '7am-8am', 
    //             room: 'room2',
    //             instructor: 'teacher2',
    //         }
    //     ]
    //     )
    // console.log(update)//program, year, semester, block, sched

    // //delete schedule
    // const del = await schedule.delete( '656ad2c4fb46bfeb8f5884ca') // schedule id

    // //read a single schedule
    // const readItem = await schedule.readItem(
    //     '655e3d2a9dd0ed242055f1a2', // schedule id 
    //     'course1'// courseCode
    //     );
    // console.log(readItem.courseCode) //courseCode, courseDescription, courseUnit, day, time, room, instructor

    // // read all schedule
    // const readAllItems = await schedule.readAllItems('655e3d2a9dd0ed242055f1a2')// schedule id
    // if (readAllItems) {
    //     //read id 
    //     console.log('User IDs:', readAllItems.map((sched: scheduleItemModel) => sched._id).join(', ')); //map function is the same function of for loop 
    // } else {
    //     console.error('Failed to read all users.');
    // }

    // //create schedule
    // const addItem = await schedule.addItem(
    //             '655e3d2a9dd0ed242055f1a2',//schedule id 
    //             'course 4',//courseCode
    //             'course number 4',//courseDescription
    //             '2',//courseUnit
    //             'tuesday',//day
    //             '7am-8am', //time
    //             'room2',//room
    //             'teacher2'//instructor
    //             )
    // console.log(addItem)

    // //update schedule
    // const updateItem = await schedule.updateItem(
    //     '655e3d2a9dd0ed242055f1a2', //schedule id
    //     '656ad86bb86964b6540b1c05', // schedule course id
    //             'course8',//courseCode
    //             'course number 4',//courseDescription
    //             '2',//courseUnit
    //             'tuesday',//day
    //             '7am-8am', //time
    //             'room2',//room
    //             'teacher2'//instructor
    //             )
    // console.log(updateItem?.courseCode) //courseCode, courseDescription, courseUnit, day, time, room, instructor


    // //delete schedule
    // const del = await schedule.deleteItem( '655e3d2a9dd0ed242055f1a2', '656ad7d2bf7649d83ccb93a7')  
 */

    
}

approach()