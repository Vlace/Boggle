from flask import Flask, redirect, render_template, session, request, jsonify
from boggle import Boggle


app = Flask(__name__)
app.config["SECRET_KEY"] = "SH SECRET"

init_boggle = Boggle()

@app.route("/")
def home():    
    make_board = init_boggle.make_board()
    session['current_board']= make_board
    return render_template('index.html', make_board = make_board)

@app.route("/guess_check")
def guess_check():
    word = request.args["word"]
    board = session["current_board"]
    response = init_boggle.check_valid_word(board, word)
    return jsonify({'result': response})

@app.route("/finished_game")
def finished_game():
    return redirect("/stats")

@app.route("/stats")
def give_score():
    return render_template("stats.html")