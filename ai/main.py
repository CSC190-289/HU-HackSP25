import os
import logging
from flask import jsonify, request
from google.cloud import storage
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Configure logging
logging.basicConfig(level=logging.INFO)

# Global variables for model and tokenizer
model = None
tokenizer = None

def load_model_and_tokenizer():
    global model, tokenizer
    if model is None or tokenizer is None:
        try:
            # Download model files from Google Cloud Storage
            bucket_name = "journey_emotions_bucket"
            model_dir = "fine_tuned_bert_model"
            local_dir = "/tmp/fine_tuned_bert_model"

            os.makedirs(local_dir, exist_ok=True)
            storage_client = storage.Client()
            bucket = storage_client.bucket(bucket_name)

            # Download all files in the model directory
            blobs = bucket.list_blobs(prefix=model_dir)
            for blob in blobs:
                local_path = os.path.join(local_dir, blob.name.split("/")[-1])
                blob.download_to_filename(local_path)

            # Load model and tokenizer from local directory
            model = AutoModelForSequenceClassification.from_pretrained(local_dir)
            tokenizer = AutoTokenizer.from_pretrained(local_dir)

            logging.info("Model and tokenizer loaded successfully.")
        except Exception as e:
            logging.error(f"Error loading model or tokenizer: {str(e)}")
            raise Exception("Failed to load model or tokenizer")

def predict(request):
    try:
        logging.info("Received request: %s", request.get_json())

        # Load the model and tokenizer (if not already loaded)
        load_model_and_tokenizer()

        # Parse user input from the HTTP request
        input_data = request.get_json(silent=True)
        if not input_data or "text" not in input_data:
            logging.error("Invalid input received")
            return jsonify({"error": "Invalid input. Please provide a 'text' field in JSON format."}), 400

        user_input = input_data["text"]

        # Ensure the input is a non-empty string
        if not isinstance(user_input, str) or len(user_input.strip()) == 0:
            logging.error("Empty or invalid text field")
            return jsonify({"error": "The 'text' field must be a non-empty string."}), 400

        # Tokenize the user input
        inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True, max_length=128)

        # Perform prediction
        outputs = model(**inputs)
        logits = outputs.logits

        # Convert logits to probabilities and class labels
        probabilities = torch.nn.functional.softmax(logits, dim=-1)
        predicted_label_idx = torch.argmax(probabilities, dim=-1).item()

        # Map label index to intent (ensure you have a mapping dictionary)
        label_to_intent = {0: "sadness", 1: "joy", 2: "love", 3: "anger", 4: "fear", 5: "suprise"}  # Example mapping
        predicted_intent = label_to_intent.get(predicted_label_idx, "unknown")

        logging.info("Prediction successful: %s", predicted_intent)

        return jsonify({
            "predicted_intent": predicted_intent,
            "confidence_scores": probabilities.tolist()
        })

    except Exception as e:
        logging.error("Error occurred during prediction: %s", str(e))
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
