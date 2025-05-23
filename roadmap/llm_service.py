import os
from django.conf import settings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

class LLMManager:
    _instance = None
    _llm_cache = {}
    _api_key = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LLMManager, cls).__new__(cls)
            cls._instance._initialize_api_key()
        return cls._instance

    def _initialize_api_key(self):
        if LLMManager._api_key is None:
            LLMManager._api_key = getattr(settings, 'GOOGLE_API_KEY', None)
            if not LLMManager._api_key:
                raise EnvironmentError(
                    "GOOGLE_API_KEY not found in Django settings. "
                    "Please set it in your environment variables or settings.py."
                )

    def get_llm(self, model: str = "gemini-2.0-flash", temperature: float = 0.7):
        config_key = (model, temperature)
        if config_key not in self._llm_cache:
            self._llm_cache[config_key] = ChatGoogleGenerativeAI(
                model=model,
                google_api_key=self._api_key,
                temperature=temperature
            )
        return self._llm_cache[config_key]

def get_general_chat_chain():
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=0.7)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful and friendly AI assistant."),
        ("user", "{input}")
    ])
    return prompt | llm | StrOutputParser()

def get_summarization_chain(temperature: float = 0.3):
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=temperature)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Summarize the following text concisely and accurately."),
        ("user", "{input}")
    ])
    return prompt | llm | StrOutputParser()

__all__ = [
    'LLMManager',
    'get_general_chat_chain',
    'get_summarization_chain',
]