from flask_restx import Resource
from flask import Response, jsonify
import threading

from api_satellite import logger
from api_satellite.api.v1 import api
from api_satellite.core import cache, limiter
from api_satellite.utils import handle400error, handle404error, handle500error

from api_satellite.api.models.example_models import example_input, example_output
from api_satellite.api.parsers.example_parsers import example_parser
from api_satellite.models.manager import SatelliteManager

model = SatelliteManager()

example_ns = api.namespace('example', description='Example generation operations')

@example_ns.route('/generate_title')
class ExampleGenerationTitle(Resource):
    """
    Example generation operations
    """
    @api.expect(example_input)
    @api.response(200, 'Example successful')
    @api.response(400, 'Invalid input')
    @api.response(404, 'LLM not found')
    @api.response(500, 'Unknown error')
    @api.marshal_with(example_output)
    def post(self):
        
        try:
            args = example_parser.parse_args()
        except:
            return handle400error(example_ns, "Invalid parameters")
        
        try:
            return jsonify({"example": "This is an example"})
        except Exception as e:
            return handle500error(example_ns, str(e))

@example_ns.route('/generate_data')
class ExampleGenerationData(Resource):
    """
    Example generation operations
    """
    @api.response(200, 'Example successful')
    @api.response(400, 'Invalid input')
    @api.response(404, 'LLM not found')
    @api.response(500, 'Unknown error')
    def get(self):
        
        try:
            task_thread = threading.Thread(target=model.start_generation)
            task_thread.start()
            return jsonify({"message": "Generation started"})
        except Exception as e:
            return handle500error(example_ns, str(e))

