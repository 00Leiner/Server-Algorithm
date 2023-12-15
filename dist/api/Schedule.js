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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemData = exports.updateItemData = exports.addItemsData = exports.readItemData = exports.readAllItemData = exports.deleteScheduleData = exports.updateScheduleData = exports.createScheduleData = exports.readScheduleData = exports.readAllScheduleData = exports.createOptionsScheduleData = void 0;
const axios_1 = __importDefault(require("axios"));
const Schedule_1 = require("./endpoints/Schedule");
const baseUrl = 'http://localhost:3000';
const readDataURL = `${baseUrl}${Schedule_1.readData}`;
const createDataURL = `${baseUrl}${Schedule_1.createData}`;
const updateDataURL = `${baseUrl}${Schedule_1.updateData}`;
const deleteDataURL = `${baseUrl}${Schedule_1.deleteData}`;
const addItemDataURL = `${baseUrl}${Schedule_1.addItemData}`;
const createOptionsScheduleData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(createDataURL, scheduleData);
    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
});
exports.createOptionsScheduleData = createOptionsScheduleData;
const readAllScheduleData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(readDataURL);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readAllScheduleData = readAllScheduleData;
const readScheduleData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = scheduleData._id;
    const url = `${readDataURL}${id}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        return response.data.schedule;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readScheduleData = readScheduleData;
const createScheduleData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(createDataURL, scheduleData);
    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
});
exports.createScheduleData = createScheduleData;
const updateScheduleData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = scheduleData._id;
    const url = `${updateDataURL}${id}`;
    const response = yield axios_1.default.put(url, scheduleData);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Schedule not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateScheduleData = updateScheduleData;
const deleteScheduleData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = scheduleData._id;
    const url = `${deleteDataURL}${id}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 204) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Schedule not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteScheduleData = deleteScheduleData;
const readAllItemData = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = scheduleData._id;
    const url = `${readDataURL}program/block/schedule/${scheduleId}/courses/code`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        // console.log(response.data.item)
        return response.data.sched;
    }
    else if (response.status === 404) {
        throw new Error(`No Items Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readAllItemData = readAllItemData;
const readItemData = (scheduleData, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = scheduleData._id;
    const courseCode = itemData.courseCode;
    const url = `${readDataURL}program/block/schedule/${scheduleId}/course/code/${courseCode}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        // console.log(response.data.sched)
        return response.data.sched;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readItemData = readItemData;
const addItemsData = (scheduleData, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = scheduleData._id;
    const url = `${addItemDataURL}${scheduleId}`;
    const response = yield axios_1.default.post(url, itemData);
    if (response.status === 200) {
        return response.data.sched;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.addItemsData = addItemsData;
const updateItemData = (scheduleData, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = scheduleData._id;
    const itemId = itemData._id;
    const url = `${updateDataURL}program/block/course/schedule/${scheduleId}/course/code/${itemId}`;
    const response = yield axios_1.default.put(url, itemData);
    if (response.status === 200) {
        return response.data.sched;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateItemData = updateItemData;
const deleteItemData = (scheduleData, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = scheduleData._id;
    const itemId = itemData._id;
    const url = `${deleteDataURL}program/block/course/schedule/${scheduleId}/course/code/${itemId}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 200) {
        // console.log(response.data.sched)
        return response.data.sched;
    }
    else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteItemData = deleteItemData;
