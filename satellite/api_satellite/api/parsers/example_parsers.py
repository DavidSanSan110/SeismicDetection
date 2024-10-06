from flask_restx import reqparse

example_parser = reqparse.RequestParser()
example_parser.add_argument('example', type=str, required=True, help='The example to use for generation')