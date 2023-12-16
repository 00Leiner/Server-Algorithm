from ortools.sat.python import cp_model
import random
import requests

class Fetching:
    def __init__(self, data):
        self.url = 'http://localhost:3000/Schedule/create'
        self.data = data
    
    def perform_put_request(self):
        response = requests.post(self.url, json=self.data)

        if response.status_code == 200:
            print('PUT request successful.')
        else:
            print(f"Error in PUT request. Status code: {response.status_code}")
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
            for c in s['courses']:
                for d in self.days:
                    for h in self.hours:
                        for r in self.rooms:
                            for t in self.teachers:
                                for specialized in t['specialized']:
                                    if c['code'] == specialized['code'] and r['type'] == c['type']:
                                         self.X[s['program'], c['code'], d, h, r['name'], t['name']] = \
                                            self.model.NewBoolVar(f'X_{s["program"]}_{c["code"]}_{d}_{h}_{r["name"]}_{t["name"]}')
    
    def unit_constraints(self):
        for s in self.students:
            for c in s['courses']:
                units = int(c['units'])

                self.model.Add(sum(self.X[
                    s['program'], c['code'], d, h, r['name'], t['name']
                    ] for d in self.days for h in self.hours for r in self.rooms for t in self.teachers for specialized in t['specialized'] if c['code'] == specialized['code'] and r['type'] == c['type']) == units)

    def no_double_booking_rooms_availability(self):
        for d in self.days:
            for h in self.hours:
                for r in self.rooms:
                    room_constraints = [
                        self.X[s['program'], c['code'], d, h, r['name'], t['name']] 
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
            self.model.Add(sum(self.X[
                s['program'], c['code'], rest_day, h, r['name'], t['name']]
                            for c in s['courses']
                            for h in self.hours
                            for r in self.rooms
                            for t in self.teachers
                            for specialized in t['specialized'] 
                            if c['code'] == specialized['code'] and r['type'] == c['type']) == 0)
        # 1 day rest of teaching schedule
        for t in self.teachers:
            rest_day = random.choice(self.days)
            self.model.Add(sum(self.X[
                s['program'], c['code'], rest_day, h, r['name'], t['name']]
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

    def on_solution_callback(self):

        print(f'Solution {self.solution_count}:')
        for x, value in self.scheduler.X.items():
            if self.Value(value):
                print(f'{x}')
                        
        self.solution_count += 1

        if self.solution_count >= self.limit:
            self.StopSearch()

if __name__ == "__main__":
    from data import rooms, teachers, students

    scheduler = Scheduler(rooms, students, teachers)
    
    limit = 1  
    solution_printer = SolutionPrinter(scheduler, limit)
    
    scheduler.solver.SearchForAllSolutions(scheduler.model, solution_printer)

    print(f'Number of solutions found: {solution_printer.solution_count}')

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
    #fetching_instance = Fetching(schedule_data)
    #fetching_instance.perform_put_request()
