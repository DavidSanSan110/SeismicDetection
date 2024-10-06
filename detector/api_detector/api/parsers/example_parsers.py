from flask_restx import reqparse

example_parser = reqparse.RequestParser()
example_parser.add_argument('example', type=str, required=True, help='The example to use for generation')

matrices_parser = reqparse.RequestParser()
matrices_parser.add_argument('matrices', type=list, required=True, help='The matrices to use for generation', location='json')