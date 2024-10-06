#from api_satellite.models import DBConnection
import random
import csv
import os

class Satellite:
    def __init__(self, id):
        self.id = id
        files = os.listdir(os.getcwd() + "/api_satellite/models/data")
        files = sorted([file for file in files if file.endswith(".csv")])
        file = files[id - 1]
        print("Loading file: ", file)

        with open(os.getcwd() + "/api_satellite/models/data/" + file, newline='') as f:
            reader = csv.reader(f)
            self.data = list(reader)

        #remove header from csv
        self.data = self.data[1:]
        self.datacopy = self.data.copy()

    def stream_signal(self):
        query = f"SELECT time_rel, velocity FROM signals WHERE id = {self.id} ORDER BY time_rel ASC"

        # TODO

    def generate_vector(self):
        # Generate a random vector of 6 elements
        #return [random.random() for _ in range(6)]
        #pop 6 first elements from data only column velocity(m/s)
        elements = self.data[:2000] if len(self.data) >= 2000 else self.data
        #remove 6 first elements from data
        self.data = self.data[2000:] if len(self.data) >= 2000 else []

        if len(self.data) == 0:
            self.data = self.datacopy.copy()
        #take only the column velocity(m/s)
        #elements = [float(element[2]) for element in elements]     
        elements = [(float(element[1]), float(element[2])) for element in elements]
        return elements