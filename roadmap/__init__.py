import os
from django.conf import settings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# It's good practice to ensure the API key is loaded from settings or environment
# In a real Django project, settings.py usually loads dotenv.
# For simplicity, we'll assume os.getenv("GOOGLE_API_KEY") works here.
if not settings.GOOGLE_API_KEY:
    raise EnvironmentError("GOOGLE_API_KEY not found. Please set it in your environment or .env file.")

# Initialize the base LLM instance
# This LLM instance will be created only once when 'myapp' is first imported.
llm_gemini_flash = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=0.7  # Default temperature for general use
)

# Define common chains or components
def get_general_chat_chain():
    """Returns a LangChain chain for general conversational chat."""
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful and friendly AI assistant."),
        ("user", "{input}")
    ])
    return prompt | llm_gemini_flash | StrOutputParser()

def get_summarization_chain(temperature=0.3):
    """Returns a LangChain chain for text summarization with a custom temperature."""
    # We can create a new LLM instance with different parameters if needed
    # Or, if temperature is the only difference, you could pass it directly to the chain
    llm_for_summarization = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=temperature
    )
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Summarize the following text concisely and accurately."),
        ("user", "{input}")
    ])
    return prompt | llm_for_summarization | StrOutputParser()

# You can also use __all__ to control what's imported with "from myapp import *"
__all__ = [
    'llm_gemini_flash',
    'get_general_chat_chain',
    'get_summarization_chain',
]