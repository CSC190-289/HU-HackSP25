from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
######
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")
model = AutoModelForSequenceClassification.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")

def get_percentages(text):
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt")

    # Get logits and calculate probabilities
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=-1).squeeze()  # Remove batch dimension

    # Get emotion labels from the model config
    emotion_labels = model.config.id2label
    results =[]
    # Print each emotion and its percentage
    for i, prob in enumerate(probabilities):
        results.append(f"{prob.item() * 100:.2f}")
        # print(f"{emotion_labels[i]}: {prob.item() * 100:.2f}%")
    return results
    
#######
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    if request.method == "POST":
        raw_string = request.body.decode('utf-8')
        print(f"Received string: {raw_string}")

        results = get_percentages(raw_string)
        return JsonResponse(results, safe=False)

    return HttpResponse("Hello, world. You're at the polls index.")
