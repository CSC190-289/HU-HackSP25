import json
from main import predict

# Mock request object for testing
class MockRequest:
    def __init__(self, json_data):
        self._json = json_data

    def get_json(self, silent=False):
        return self._json

def test_predict():
    # Input sentence to test
    test_input = {"text": "I am very sad"}

    # Create a mock request with the input sentence
    mock_request = MockRequest(test_input)

    # Call the predict function with the mock request
    response = predict(mock_request)

    # Check if the response is valid JSON
    assert response.is_json, "Response is not JSON"

    # Parse the JSON response
    response_data = response.get_json()

    # Validate the structure of the response
    assert "predicted_intent" in response_data, "Response does not contain 'predicted_intent'"
    assert "confidence_scores" in response_data, "Response does not contain 'confidence_scores'"

    # Print the results for manual inspection (optional)
    print("Test Input:", test_input["text"])
    print("Predicted Intent:", response_data["predicted_intent"])
    print("Confidence Scores:", response_data["confidence_scores"])

# Run the test
if __name__ == "__main__":
    test_predict()
