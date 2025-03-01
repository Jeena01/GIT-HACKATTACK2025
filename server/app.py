from flask import Flask, render_template, request, jsonify
import pytesseract
from PIL import Image
import io
import os
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')



def extract_text_from_image(image):
    # Use pytesseract to extract text from the image
    text = pytesseract.image_to_string(image)
    items = text.split('\n')
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
    
    @app.route('/perishables', methods=['GET'])

    