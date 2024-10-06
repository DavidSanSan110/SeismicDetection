from flask_restx import Resource
from flask import Response, jsonify
import threading

from api_detector import logger
from api_detector.api.v1 import api
from api_detector.core import cache, limiter
from api_detector.utils import handle400error, handle404error, handle500error

from api_detector.api.models.example_models import example_input, example_output
from api_detector.api.parsers.example_parsers import example_parser, matrices_parser
from api_detector.models.manager import DetectorManager

model = DetectorManager()

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

@example_ns.route('/detect_seism')
class ExampleDetectionData(Resource):
    """
    Example generation operations
    """
    @api.response(200, 'Example successful')
    @api.response(400, 'Invalid input')
    @api.response(404, 'LLM not found')
    @api.response(500, 'Unknown error')
    def post(self):
        
        try:
            args = matrices_parser.parse_args()
            print(type(args['matrices']))
            print(len(args['matrices']))
            task_thread = threading.Thread(target=model.start_detection, args=(args['matrices'],))
            task_thread.start()
            return jsonify({"message": "Detection started"})
        except Exception as e:
            return handle500error(example_ns, str(e))

