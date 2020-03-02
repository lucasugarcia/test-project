from flask import Flask

app = Flask(__name__)

app.run(port=5002, debug=True)