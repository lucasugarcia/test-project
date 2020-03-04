from flask import Flask
from employee_dao import EmployeeDAO
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__)
app.secret_key = 'testeproject'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

db_user = ''
db_password = ''
db = psycopg2.connect(dbname='testdb', user=db_user, password=db_password)
employee_dao = EmployeeDAO(db)


@app.route('/')
def index():
    return 'Bem-Vind@!'


@app.route('/api/employees', methods=['get',])
@cross_origin()
def list():
    list = employee_dao.list()

    if(len(list) > 0):
        return convert_to_employee_json(list)
    else:
        return '[]'


@app.route('/api/chart', methods=['get',])
def chart():
    list = employee_dao.chart_data()

    if (len(list) > 0):
        return convert_to_chart_json(list)
    else:
        return '[]'


@app.route('/api/employees/<int:id>', methods=['delete',])
def delete(id):
    employee_dao.delete(id)


def convert_to_employee_json(list):
    json = '['

    for employee in list:
        json += '{"id":"' + str(employee.id) + \
                '","name":"' + employee.name + \
                '","address":"' + employee.address + \
                '","phone_number":"' + employee.phone_number + \
                '","date":"' + str(employee.date) + \
                '","status":"' + str(employee.status) + '"},'

    json = json[:-1]
    json += ']'

    return json


def convert_to_chart_json(list):
    json = '['

    for data in list:
        json += '{"date":"' + str(data[0]) + \
                '","amount":' + str(data[1]) + '},'

    json = json[:-1]
    json += ']'

    return json


app.run(debug=True)