import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

db_user = '' # Put your user with creationdb permission
db_password = '' # Put the user's password
initial_db = '' # Put the database name which your user has access

print('Connecting...')
conn = psycopg2.connect(dbname=initial_db, user=db_user, password=db_password)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
conn.autocommit = True

cursor = conn.cursor()

#conn.cursor().execute("DROP DATABASE testdb;")
#conn.commit()

create_database = 'CREATE DATABASE testdb;'

cursor.execute(create_database)
conn.commit()

cursor.close()
conn.close()

conn = psycopg2.connect(dbname='testdb', user=db_user, password=db_password)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
conn.autocommit = True

cursor = conn.cursor()

create_table = '''
      CREATE TABLE employees (
            id serial,
            name varchar(500) NOT NULL,
            address varchar(500) NOT NULL,
            phone_number varchar(20) NOT NULL,
            date date NOT NULL,
            status boolean NOT NULL,
            PRIMARY KEY (id)
      );
      '''
      #INSERT INTO employees (name, address, phone_number, date, status) VALUES ('lucas', 'Rua 1', '123456789', '2020-03-02', False);
      #INSERT INTO employees (name, address, phone_number, date, status) VALUES ('gabriel', 'Rua 2', '987654321', '2020-03-03', True);
      #'''

cursor.execute(create_table)
conn.commit()

cursor.close()
conn.close()

print('End...')