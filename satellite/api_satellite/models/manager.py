from api_satellite.models.satellite import Satellite
from api_satellite.models.socket import start, emit
import time

class SatelliteManager:
    def __init__(self):
        start()
        self.satellites = {
            1: Satellite(1),
            2: Satellite(2),
            3: Satellite(3),
            4: Satellite(4),
            5: Satellite(5),
            6: Satellite(6)
        }

    # Start generation is a funcion that every 1 sec emits via socket new data from the satellites
    def start_generation(self):
        while True:
            matrix = [
                satellite.generate_vector()
                for satellite in self.satellites.values()
            ]
            emit("satellite_data", matrix)
            time.sleep(1)
        