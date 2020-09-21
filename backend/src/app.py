from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)



@app.route("/")
def hello():
    return "Hello!"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)