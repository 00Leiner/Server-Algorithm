from ortools.sat.python import cp_model
import random
import requests


class Fetching:
    def __init__(self):
        self.url = 'http://localhost:3000/Schedule/create'

    def perform_put_request(self, data):
        response = requests.post(self.url, json=data)

        if response.status_code == 200:
            print('POST request successful.')
        else:
            print(f"Error in POST request. Status code: {response.status_code}")
            print(response.text)

class Scheduler:
    def __init__(self, rooms, students, teachers):
        #variable
        self.rooms = rooms
        self.students = students
        self.teachers = teachers
        self.days = range(0, 6)
        self.hours = range(7, 20)
        # Initialize the CP-SAT model
        self.model = cp_model.CpModel()
        # Create the solver instance
        self.solver = cp_model.CpSolver()
        # binary variables
        self.X = {} # X[s, c, d, h, r, t]
        #populate
        self.binary_variable()  
        self.unit_constraints()
        self.no_double_booking_rooms_availability()
        self.one_day_rest_constraints()

    def binary_variable(self):
        for s in self.students:
            program = s['program']
            year = s['year']
            semester = s['semester']
            block = s['block']
            for c in s['courses']:
                courseCode = c['code']
                courseDescription = c['description']
                courseUnits = c['units']
                courseType = c['type']
                for d in self.days:
                    for h in self.hours:
                        for r in self.rooms:
                            room = r['name']
                            for t in self.teachers:
                                instructor = t['name']
                                for specialized in t['specialized']:
                                    if courseCode == specialized['code'] and r['type'] == courseType:
                                         self.X[program, year, block, semester, courseCode, courseDescription, courseUnits, d, h, room, instructor] = \
                                            self.model.NewBoolVar(f'X_{program}_{year}_{block}_{semester}_{courseCode}_{courseDescription}_{courseUnits}_{d}_{h}_{room}_{instructor}')
    
    def unit_constraints(self):
        for s in self.students:
            program = s['program']
            year = s['year']
            semester = s['semester']
            block = s['block']
            for c in s['courses']:
                courseCode = c['code']
                courseDescription = c['description']
                courseUnits = c['units']
                courseType = c['type']
                units = int(c['units'])

                self.model.Add(sum(self.X[program, year, block, semester, courseCode, courseDescription, courseUnits, d, h, r['name'], t['name']] 
                                   for d in self.days 
                                   for h in self.hours 
                                   for r in self.rooms 
                                   for t in self.teachers 
                                   for specialized in t['specialized'] 
                                   if c['code'] == specialized['code'] and r['type'] == courseType
                                   ) == units)

    def no_double_booking_rooms_availability(self):
        for d in self.days:
            for h in self.hours:
                for r in self.rooms:
                    room_constraints = [self.X[s['program'], s['year'], s['block'], s['semester'], c['code'], c['description'], c['units'], d, h, r['name'], t['name']] 
                                        for s in self.students 
                                        for c in s['courses'] 
                                        for t in self.teachers 
                                        for specialized in t['specialized'] 
                                        if c['code'] == specialized['code'] and r['type'] == c['type']
                                        ]
                    self.model.Add(sum(room_constraints) <= 1)

    def one_day_rest_constraints(self):
        # 1 day rest of learning schedule
        for s in self.students:
            rest_day = random.choice(self.days)
            self.model.Add(sum(self.X[s['program'], s['year'], s['block'], s['semester'], c['code'], c['description'], c['units'], rest_day, h, r['name'], t['name']] 
                               for c in s['courses']
                               for h in self.hours
                               for r in self.rooms
                               for t in self.teachers
                               for specialized in t['specialized'] 
                               if c['code'] == specialized['code'] and r['type'] == c['type']) == 0)
            
        # 1 day rest of teaching schedule
        for t in self.teachers:
            rest_day = random.choice(self.days)
            self.model.Add(sum(self.X[s['program'], s['year'], s['block'], s['semester'], c['code'], c['description'], c['units'], rest_day, h, r['name'], t['name']] 
                               for s in self.students
                               for c in s['courses']
                               for h in self.hours
                               for r in self.rooms
                               for specialized in t['specialized'] 
                               if c['code'] == specialized['code'] and r['type'] == c['type']) == 0)    

class SolutionPrinter(cp_model.CpSolverSolutionCallback):
    def __init__(self, scheduler, limit):
        cp_model.CpSolverSolutionCallback.__init__(self)
        self.scheduler = scheduler
        self.solution_count = 0
        self.limit = limit
        self.solutions = []

    def on_solution_callback(self):
        current_solution = {
            "options": f"option{self.solution_count + 1}",
            "programs": []
        }

        for (program, year, block, semester, courseCode, courseDescription, courseUnits, day, time, room, instructor), value in self.scheduler.X.items():
            if self.Value(value):
                # Check if the program is already in the solution
                program_info = next((p for p in current_solution["programs"] if p["program"] == program and p["year"] == year and p["block"] == block and p["semester"] == semester), None)

                if program_info is None:
                    program_info = {
                        "program": program,
                        "year": year,
                        "block": block,
                        "semester": semester,
                        "sched": []
                    }
                    current_solution["programs"].append(program_info)

                program_info["sched"].append({
                    "courseCode": courseCode,
                    "courseDescription": courseDescription,
                    "courseUnit": courseUnits,
                    "day": day,
                    "time": f"{time}am-{time + 1}am",  # Assuming the time is in hours
                    "room": room,
                    "instructor": instructor,
                })

        self.solutions.append(current_solution)
        self.solution_count += 1

        if self.solution_count >= self.limit:
            self.StopSearch()


if __name__ == "__main__":
    from data import rooms, teachers, students

    scheduler = Scheduler(rooms, students, teachers)

    limit = 10
    solution_printer = SolutionPrinter(scheduler, limit)

    scheduler.solver.SearchForAllSolutions(scheduler.model, solution_printer)

    print(f'Number of solutions found: {solution_printer.solution_count}')

    

    fetching_instance = Fetching()
    for solution in solution_printer.solutions:
        fetching_instance.perform_put_request(solution)

'''
    schedule_data = {
        "options": "option1",
        "programs": [
            {
                "program": "BSCS",
                "year": "3", 
                "semester": "2", 
                "block": "B", 
                "sched": [
                    {
                        "courseCode": "course1",
                        "courseDescription": "course number 1",
                        "courseUnit": "3",
                        "day": "monday",
                        "time": "7am-8am", 
                        "room": "room1",
                        "instructor": "teacher1",
                    },
                    {
                        "courseCode": "course2",
                        "courseDescription": "course number 2",
                        "courseUnit": "2",
                        "day": "tuesday",
                        "time": "7am-8am", 
                        "room": "room2",
                        "instructor": "teacher2",
                    }
                ]
            },
        ]
    }
    fetching_instance = Fetching(schedule_data)
    fetching_instance.perform_put_request()
'''
