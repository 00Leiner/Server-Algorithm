"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheduleItems = exports.updateScheduleItem = exports.addScheduleItem = exports.readScheduleItem = exports.readAllScheduleItems = exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.readSchedule = exports.readAllSchedules = exports.createOptionsSchedule = void 0;
const Schedule_1 = require("../api/Schedule");
const createOptionsSchedule = (getOptions, getPrograms) => __awaiter(void 0, void 0, void 0, function* () {
    const newoptionsSchedule = {
        options: getOptions,
        programs: getPrograms,
    };
    try {
        const response = yield (0, Schedule_1.createOptionsScheduleData)(newoptionsSchedule);
        console.log(`Schedule created successfully:`, response.schedule);
        return response.schedule;
    }
    catch (error) {
        console.error(`Failed to delete schedule: ${error.message}`);
    }
});
exports.createOptionsSchedule = createOptionsSchedule;
const readAllSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Schedule_1.readAllScheduleData)();
        if (Array.isArray(response.schedules)) {
            const allSchedules = response.schedules.map((schedule) => ({
                _id: schedule._id,
                program: schedule.program,
                year: schedule.year,
                semester: schedule.semester,
                block: schedule.block,
                sched: schedule.sched
            }));
            return { allSchedules };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all schedules: ${error.message}`);
    }
});
exports.readAllSchedules = readAllSchedules;
const readSchedule = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = { _id: getID };
        const response = yield (0, Schedule_1.readScheduleData)(schedule);
        const _id = response._id;
        const program = response.program;
        const year = response.year;
        const semester = response.semester;
        const block = response.block;
        const sched = response.sched;
        return { _id, program, year, semester, block, sched };
    }
    catch (error) {
        console.error(`Failed to read schedule: ${error.message}`);
    }
});
exports.readSchedule = readSchedule;
const createSchedule = (getProgram, getYear, getSemester, getBlock, getItems) => __awaiter(void 0, void 0, void 0, function* () {
    const newSchedule = {
        program: getProgram,
        year: getYear,
        semester: getSemester,
        block: getBlock,
        sched: getItems
    };
    try {
        const response = yield (0, Schedule_1.createScheduleData)(newSchedule);
        console.log(`Schedule created successfully:`, response.schedule);
        return response.schedule;
    }
    catch (error) {
        console.error(`Failed to delete schedule: ${error.message}`);
    }
});
exports.createSchedule = createSchedule;
const updateSchedule = (getID, getProgram, getYear, getSemester, getBlock, getItems) => __awaiter(void 0, void 0, void 0, function* () {
    const newSchedule = {
        _id: getID,
        program: getProgram,
        year: getYear,
        semester: getSemester,
        block: getBlock,
        sched: getItems
    };
    try {
        const response = yield (0, Schedule_1.updateScheduleData)(newSchedule);
        console.log(`Schedule update successfully:`, response.schedules);
        return response.schedules;
    }
    catch (error) {
        console.error(`Failed to update schedule: ${error.message}`);
    }
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newSchedule = {
        _id: getID
    };
    try {
        const response = yield (0, Schedule_1.deleteScheduleData)(newSchedule);
        console.log('Schedule Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete schedule: ${error.message}`);
    }
});
exports.deleteSchedule = deleteSchedule;
const readAllScheduleItems = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = { _id: getID };
        const response = yield (0, Schedule_1.readAllItemData)(schedule);
        if (Array.isArray(response)) {
            const allItems = response.map((sched) => ({
                _id: sched._id,
                courseCode: sched.courseCode,
                courseDescription: sched.courseDescription,
                courseUnit: sched.courseUnit,
                day: sched.day,
                time: sched.time,
                room: sched.room,
                instructor: sched.instructor,
            }));
            return { allItems };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all courses: ${error.message}`);
    }
});
exports.readAllScheduleItems = readAllScheduleItems;
const readScheduleItem = (getScheduleID, getItemID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = { _id: getScheduleID };
        const course = { courseCode: getItemID };
        const response = yield (0, Schedule_1.readItemData)(schedule, course);
        const _id = response._id;
        const courseCode = response.courseCode;
        const courseDescription = response.courseDescription;
        const courseUnit = response.courseUnit;
        const day = response.day;
        const time = response.time;
        const room = response.room;
        const instructor = response.instructor;
        return { _id, courseCode, courseDescription, courseUnit, day, time, room, instructor };
    }
    catch (error) {
        console.error(`Failed to read all courses: ${error.message}`);
    }
});
exports.readScheduleItem = readScheduleItem;
const addScheduleItem = (getScheduleID, getCourseCode, getCourseDescription, getCourseUnits, getDay, geTime, getRoom, getInstructor) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = { _id: getScheduleID };
    const newItem = {
        courseCode: getCourseCode,
        courseDescription: getCourseDescription,
        courseUnit: getCourseUnits,
        day: getDay,
        time: geTime,
        room: getRoom,
        instructor: getInstructor,
    };
    try {
        const response = yield (0, Schedule_1.addItemsData)(schedule, newItem);
        console.log(`Schedule item created successfully:`, response.sched);
        return response;
    }
    catch (error) {
        console.error(`Failed to delete schedule: ${error.message}`);
    }
});
exports.addScheduleItem = addScheduleItem;
const updateScheduleItem = (getScheduleID, getID, getCourseCode, getCourseDescription, getCourseUnits, getDay, geTime, getRoom, getInstructor) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = { _id: getScheduleID };
    const newItem = {
        _id: getID,
        courseCode: getCourseCode,
        courseDescription: getCourseDescription,
        courseUnit: getCourseUnits,
        day: getDay,
        time: geTime,
        room: getRoom,
        instructor: getInstructor,
    };
    try {
        const response = yield (0, Schedule_1.updateItemData)(schedule, newItem);
        if (response.length > 0) {
            const updatedItem = response.find(course => course._id === getID);
            if (updatedItem) {
                console.log(`Item update successfully:`, updatedItem);
                return updatedItem;
            }
            else {
                console.log(`Updated course not found.`);
            }
        }
        else {
            console.log(`No courses found for the schedule.`);
        }
    }
    catch (error) {
        console.error(`Failed to update course: ${error.message}`);
    }
});
exports.updateScheduleItem = updateScheduleItem;
const deleteScheduleItems = (getScheduleID, getItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = { _id: getScheduleID };
    const course = { _id: getItemId };
    try {
        const response = yield (0, Schedule_1.deleteItemData)(schedule, course);
        console.log('Course Schedule Deleted!', response);
        return response;
    }
    catch (error) {
        console.error(`Failed to delete course: ${error.message}`);
        throw error;
    }
});
exports.deleteScheduleItems = deleteScheduleItems;
