from flask import Flask
from employee_dao import EmployeeDAO
import psycopg2

app = Flask(__name__)
app.secret_key = 'testeproject'

db_user = ''
db_password = ''

db = psycopg2.connect(dbname='testdb', user=db_user, password=db_password)
employee_dao = EmployeeDAO(db)

@app.route('/')
def index():
    return 'Bem-Vind@!'

@app.route('/api/employees', methods=['get',])
def list():
    list = employee_dao.list()

    if(len(list) > 0):
        return convert_to_json(list)
    else:
        return '[]'

def convert_to_json(list):

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


app.run(debug=True)