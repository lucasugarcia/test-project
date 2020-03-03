from models import Employee
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

update_employee_string = 'UPDATE employees SET name=%s, address=%s, phone_number=%s, date=%s, status=%s where id=%s;'
insert_employee_string = 'INSERT INTO employees (name, address, phone_number, date, status) values (%s, %s, %s, %s, %s) RETURNING id;'
select_employees_string = 'SELECT * FROM employees;'
find_employee_string = 'SELECT * FROM employees WHERE id=%s;'
delete_employee_string = 'DELETE FROM employees WHERE id=%s;'

class EmployeeDAO:
    def __init__(self, conn):
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        conn.autocommit = True
        self.__conn = conn

    def save(self, employee):
        cursor = self.__conn.cursor()

        if (employee.id):
            cursor.execute(update_employee_string, (employee.name, employee.address, employee.phone_number, employee.date, employee.status, employee.id))
        else:
            cursor.execute(insert_employee_string, (employee.name, employee.address, employee.phone_number, employee.date, employee.status))
            new_id = cursor.fetchone()[0]
            employee.id = new_id

        self.__conn.commit()

        return employee

    def list(self):
        cursor = self.__conn.cursor()
        cursor.execute(select_employees_string)
        data = []

        row = cursor.fetchone()
        while row:
            data.append()
            row = cursor.fetchone()

        return convert_to_list(data)

    def find(self, id):
        cursor = self.__conn.cursor()
        cursor.execute(find_employee_string, (id))
        tuple = cursor.fetchone()
        return create_employee(tuple)

    def delete(self, id):
        self.__conn.cursor().execute(delete_employee_string, (id))
        self.__conn.commit()

def convert_to_list(data):
    return list(map(create_employee, data))

def create_employee(tuple):
    return Employee(tuple[1], tuple[2], tuple[3], tuple[4], tuple[5], id=tuple[0])