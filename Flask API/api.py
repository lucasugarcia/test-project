from flask import Flask, request
from employee_dao import EmployeeDAO
from models import Employee
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__)
app.secret_key = 'testeproject'
app.config['CORS_HEADERS'] = 'content-type'
CORS(app, origins="http://127.0.0.1:3000", allow_headers=["content-type","Access-Control-Allow-Credentials"],supports_credentials=True)

db_user = ''
db_password = ''
db = psycopg2.connect(dbname='testdb', user=db_user, password=db_password)
employee_dao = EmployeeDAO(db)

@app.route('/')
@cross_origin()
def index():
    return 'Welcome!'

@app.route('/api/employees', methods=['get',])
@cross_origin()
def list():
    list = employee_dao.list()

    if(len(list) > 0):
        return convert_to_employee_json(list)
    else:
        return '[]'

@app.route('/api/chart', methods=['get',])
@cross_origin()
def chart():
    list = employee_dao.chart_data()

    if (len(list) > 0):
        return convert_to_chart_json(list)
    else:
        return '[]'

@app.route('/api/employees', methods=['post',])
@cross_origin()
def delete():
    req = request.json

    id = req['id']

    employee_dao.delete(id)

    return '[]'

@app.route('/api/new', methods=['post',])
@cross_origin()
def new():
    req = request.json
    name = req['name']
    address = req['address']
    phone_number = req['phone_number']
    date = req['date']
    status = req['status']

    employee = Employee(name, address, phone_number, date, status)

    added_employee = employee_dao.save(employee)

    if(added_employee.id):
        return '{"id":"' + str(added_employee.id) + \
                '","name":"' + employee.name + \
                '","address":"' + employee.address + \
                '","phone_number":"' + employee.phone_number + \
                '","date":"' + str(employee.date) + \
                '","status":"' + str(employee.status) + '"}'
    else:
        return '{"message":"error"}'

@app.route('/api/update', methods=['post',])
@cross_origin()
def update():
    req = request.json
    id = req['id']
    name = req['name']
    address = req['address']
    phone_number = req['phone_number']
    date = req['date']
    status = req['status']

    employee = Employee(name, address, phone_number, date, status, id=id)

    employee_dao.save(employee)

    return '{"id":"' + str(employee.id) + \
            '","name":"' + employee.name + \
            '","address":"' + employee.address + \
            '","phone_number":"' + employee.phone_number + \
            '","date":"' + str(employee.date) + \
            '","status":"' + str(employee.status) + '"}'

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