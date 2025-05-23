from django.conf import settings
from django.http import JsonResponse
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from . import get_general_chat_chain

def chat_with_gemini(request):
    """
    Handles chat interactions with the Gemini 2.0 Flash model using LangChain.
    Accepts POST requests with a 'message' and returns the AI's response.
    For GET requests, it returns a simple informational JSON message.
    """
    if request.method == 'POST':
        user_input = request.POST.get('message')

        # Validate that a message was provided
        if not user_input:
            return JsonResponse({'error': 'No message provided'}, status=400)

        # Access the API key from Django settings.
        # This assumes GOOGLE_API_KEY is loaded from your .env file into settings.py.
        gemini_api_key = settings.GOOGLE_API_KEY

        # Ensure the API key is configured
        if not gemini_api_key:
            return JsonResponse({'error': 'Google API Key not configured'}, status=500)

        try:
            # Initialize the Gemini 2.0 Flash model with a set temperature
            chain = get_general_chat_chain()
            # Invoke the chain to get a response from Gemini
            response = chain.invoke({"input": user_input})

            # Return the AI's response as a JSON object
            return JsonResponse({'response': response})

        except Exception as e:
            # Catch and return any errors that occur during the AI interaction
            print(f"Error during Gemini interaction: {e}") # Log the error for debugging
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    else:
        # Handle GET requests (e.g., if someone visits the URL directly in a browser)
        # You could also render an HTML template here for a user interface.
        return JsonResponse({'message': 'Please send a POST request with a "message" field to interact with the Gemini chatbot.'}, status=200)