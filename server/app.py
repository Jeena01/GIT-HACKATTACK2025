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
from fuzzywuzzy import process

conn = sqlite3.connect('database.db')

#check if table exists
conn.execute('''CREATE TABLE IF NOT EXISTS users
             (userid INTEGER PRIMARY KEY AUTOINCREMENT,
             username TEXT''')
conn.execute('''CREATE TABLE IF NOT EXISTS inventory
             itemid INTEGER PRIMARY KEY AUTOINCREMENT,
             userid INTEGER,
             item TEXT,
             days_till_expiry INTEGER,
             date_expiry TEXT,
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

def parse_lines(text, threshold=80):
    # Load items from JSON file
    with open('expiry.json') as f:
        items = json.load(f)["perishable_grocery_items"]

    # Initialize result dictionary
    found_items = {}

    # Split text into words and check for fuzzy matches
    words = text.split()

    for word in words:
        match, score = process.extractOne(word, items.keys())  # Find best match
        if score >= threshold:  # If match is good enough
            found_items[match] = items[match]

    return found_items       
            



@app.route('/upload', methods=['POST'])

def upload_receipt():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    userid = request.form['userid']
    

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Read the image data
        image_data = file.read()

        # Open the image using PIL
        image = Image.open(io.BytesIO(image_data))

        # Extract text from the image
        text = extract_text_from_image(image)
        found_items = parse_lines(text)

        for item in found_items:
            conn.execute("INSERT INTO inventory (userid, item, days_till_expiry, date_expiry) VALUES (?, ?, ?, ?)", (1, item, found_items[item], "2023-12-31"))
            conn.commit()
    
@app.route('/remove', methods=['POST'])
def remove_item():
    itemid = request.form['item-id']
    conn.execute("DELETE FROM inventory WHERE itemid = ?", (itemid,))
    conn.commit()
    return jsonify({'success': True})


@app.route('/perishables', methods=['GET'])
def perishables():
    userid = request.args.get('userid')
    cursor = conn.execute("SELECT * FROM inventory WHERE userid = ?", (userid, ))
    items = cursor.fetchall()
    return jsonify({'items': items})