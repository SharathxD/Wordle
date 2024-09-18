from flask import Flask, request, jsonify
from flask_cors import CORS  
import random


app = Flask(__name__)
CORS(app)  
file_path = 'words.txt'
with open(file_path, 'r') as file:
    valid_words = [word.strip().upper() for word in file.readlines()]



@app.route('/api/new-game', methods=['GET'])
def new_game():
    global secret_word
    secret_word = random.choice(valid_words)
    print(f"New game started. Secret word is {secret_word}")
    return jsonify({'secretWord': secret_word})

@app.route('/api/guess', methods=['POST'])
def guess():
    data = request.get_json()
    guess_word = data.get('guess', '').upper()
    print(f"Received guess: {guess_word}")

    if len(guess_word) != 5 or guess_word not in valid_words:
        print("Invalid guess received.")
        return jsonify({'error': 'Invalid guess'}), 400

    status = []
    for i in range(5):
        if guess_word[i] == secret_word[i]:
            status.append('correct')
        elif guess_word[i] in secret_word:
            status.append('misplaced')
        else:
            status.append('incorrect')

    print(f"Status returned: {status}")
    return jsonify({'status': status})

if __name__ == '__main__':
    app.run(debug=True)

