from flask import Flask
from employee_dao import EmployeeDAO
import psycopg2

app = Flask(__name__)

db_user = 'lgarcia'
db_password = 'gnt42cas'

db = psycopg2.connect(dbname='testedb', user=db_user, password=db_password)
employee_dao = EmployeeDAO(db)

@app.route('/')
def index():
    return 'Bem-Vind@!'

app.run(debug=True)