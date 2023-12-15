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
exports.Schedules = void 0;
const Schedule_1 = require("./components/Schedule");
class Schedules {
    create(getOprions, getPrograms) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, Schedule_1.createOptionsSchedule)(getOprions, getPrograms);
            return response;
        });
    }
}
exports.Schedules = Schedules;
function approach() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
approach();
