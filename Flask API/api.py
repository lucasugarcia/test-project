from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Bem-Vind@!'

app.run(debug=True)