from flask_restx import fields

from api_satellite.api.v1 import api

example_input = api.model('ExampleInput', {
    'example': fields.String(required=True, description='The example to use for generation'),
})

example_output = api.model('ExampleOutput', {
    'example': fields.String(required=True, description='The generated example'),
})