from flask import Flask, render_template, request, jsonify
import pytesseract
from PIL import Image
import io
import os
import json 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sqlite3

conn = sqlite3.connect('database.db')

#check if table exists
conn.execute('''CREATE TABLE IF NOT EXISTS users
             (userid INTEGER PRIMARY KEY AUTOINCREMENT,
             username TEXT''')
conn.execute('''CREATE TABLE IF NOT EXISTS inventory
             userid INTEGER,
             item TEXT,
             expiry TEXT,
             FOREIGN KEY(userid) REFERENCES users(userid)
             ''')


app = Flask(__name__)


pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'


@app.route('/')
def index():
    return render_template('index.html')



def extract_text_from_image(image):
    # Use pytesseract to extract text from the image
    text = pytesseract.image_to_string(image)
    lines = text.split('\n')
    return lines

def parse_lines(text):
    # Split the text into lines
    lines = text.split('\n')
    with open('expiry.json') as f:
        expiry_dates = json.load(f)
        items = []
        for line in lines:
            




    

    return items



@app.route('/upload', methods=['POST'])

def upload_receipt():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Read the image data
        image_data = file.read()

        # Open the image using PIL
        image = Image.open(io.BytesIO(image_data))

        # Extract text from the image
        items = extract_text_from_image(image)


        # Return the extracted text as JSON
        return jsonify({'items': items})
    
    # @app.route('/perishables', methods=['GET'])
