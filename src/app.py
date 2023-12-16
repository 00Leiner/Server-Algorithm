from ortools.sat.python import cp_model
import random
import requests

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
        # Test
        for x, value in self.scheduler.X.items():
            if self.Value(value):
                print(f'{x}')
                        
        self.solution_count += 1

        if self.solution_count >= self.limit:
            self.StopSearch()

if __name__ == "__main__":
    # Load data from data.py
    from data import rooms, teachers, students

    scheduler = Scheduler(rooms, students, teachers)

    # Create and set the solution callback with the desired limit
    limit = 1  # Set the desired limit
    solution_printer = SolutionPrinter(scheduler, limit)
    
    # Find solutions
    scheduler.solver.SearchForAllSolutions(scheduler.model, solution_printer)

    # Print the number of solutions found
    print(f'Number of solutions found: {solution_printer.solution_count}')

    # Save the schedule data to MongoDB
    schedule_data = {
        'option1',
        [
            {
                'BSCS',
                '3', 
                '2', 
                'B', 
                [
                    {
                        'course1',
                        'course number 1',
                        '3',
                        'monday',
                        '7am-8am', 
                        'room1',
                        'teacher1',
                    },
                    {
                        'course2',
                        'course number 2',
                        '2',
                        'tuesday',
                        '7am-8am', 
                        'room2',
                        'teacher2',
                    }
                ]
            },
        ]
    }