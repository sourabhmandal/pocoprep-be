import os
import json
from django.conf import settings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
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
            LLMManager._api_key = getattr(settings, "GOOGLE_API_KEY", None)
            if not LLMManager._api_key:
                raise EnvironmentError(
                    "GOOGLE_API_KEY not found in Django settings. "
                    "Please set it in your environment variables or settings.py."
                )

    def get_llm(self, model: str = "gemini-2.0-flash", temperature: float = 0.7):
        config_key = (model, temperature)
        if config_key not in self._llm_cache:
            self._llm_cache[config_key] = ChatGoogleGenerativeAI(
                model=model, google_api_key=self._api_key, temperature=temperature
            )
        return self._llm_cache[config_key]


def get_general_chat_chain():
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=0.7)
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a helpful and friendly AI assistant."),
            ("user", "{input}"),
        ]
    )
    return prompt | llm | StrOutputParser()


def get_summarization_chain(temperature: float = 0.3):
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=temperature)
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Summarize the following text concisely and accurately."),
            ("user", "{input}"),
        ]
    )
    return prompt | llm | StrOutputParser()


def get_domain_expert_chain(
    temperature: float = 0.3,
    designation: str = "Senior Software Engineering",
    topic: str = "Golang",
    yoe: str = "3 years",
    timeframe: str = "1 month",
):
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=temperature)

    example_output = """{{
  "roadmap_data": {{
    "interviewer": "Senior Software Engineer",
    "topic": "Python Backend Development",
    "llm_response": "The full text of the LLM's response goes here...",
    "topics": [
      {{
        "title": "Programming Languages",
        "importance_score": 5.0,
        "subtopics": [
          {{"title": "Python"}},
          {{"title": "JavaScript"}},
          {{"title": "Java"}},
          {{"title": "C++"}},
          {{"title": "Go"}},
          {{"title": "Rust"}}
        ]
      }},
      {{
        "title": "Web Development",
        "importance_score": 4.0,
        "subtopics": [
          {{"title": "Frontend Frameworks"}},
          {{"title": "Backend Frameworks"}},
          {{"title": "Databases"}},
          {{"title": "API Design"}},
          {{"title": "Deployment"}}
        ]
      }},
      {{
        "title": "Data Science",
        "importance_score": 1.0,
        "subtopics": [
          {{"title": "Machine Learning"}},
          {{"title": "Deep Learning"}},
          {{"title": "Data Visualization"}},
          {{"title": "Statistical Analysis"}},
          {{"title": "Big Data Technologies"}}
        ]
      }},
      {{
        "title": "Cloud Computing",
        "importance_score": 2.0,
        "subtopics": [
          {{"title": "AWS"}},
          {{"title": "Azure"}},
          {{"title": "Google Cloud Platform"}},
          {{"title": "Serverless Computing"}},
          {{"title": "Containers"}}
        ]
      }},
      {{
        "title": "Cybersecurity",
        "importance_score": 3.0,
        "subtopics": [
          {{"title": "Network Security"}},
          {{"title": "Application Security"}},
          {{"title": "Cryptography"}},
          {{"title": "Ethical Hacking"}},
          {{"title": "Incident Response"}}
        ]
      }}
    ]
  }}
}}"""
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                f"""Act as a mentor for {designation} experienced in {topic} and have taken many {topic} interviews.""",
            ),  # Use f-string here
            (
                "system",
                f"""generate a json file structure for the given topic and subtopics. in a strict json 
      format like this example: {json.dumps(example_output, indent=2)}""",
            ),  # THIS IS THE CRITICAL LINE
            (
                "system",
                "All your generated roadmaps should be in json format following strict structure as mentioned in the example.",
            ),
            ("user", "{input}"),
        ]
    )
    return prompt | llm | StrOutputParser()


def get_topic_tutor_chain(
    temperature: float = 0.3,
    topic: str = "General",
    past_messages: list = None
):
    llm_manager = LLMManager()
    llm = llm_manager.get_llm(model="gemini-2.0-flash", temperature=temperature)

    # Concatenate the system message parts into a single string
    system_message_content = (
        f"Act As a Helpful Tutor who is experienced in teaching {topic}. "
        f"Keep your responses concise and directly relevant to the user's questions about {topic}."
    )

    # Construct the messages list for ChatPromptTemplate
    messages = [
        SystemMessagePromptTemplate.from_template(system_message_content)
    ]

    # Add past messages if provided
    if past_messages:
        messages.extend(past_messages)

    # Add the placeholder for the current user input
    messages.append(HumanMessagePromptTemplate.from_template("{input}"))

    prompt = ChatPromptTemplate.from_messages(messages)
    return prompt | llm | StrOutputParser()



__all__ = [
    "LLMManager",
    "get_domain_expert_chain",
    "get_general_chat_chain",
    "get_summarization_chain",
    "get_topic_tutor_chain",
]
