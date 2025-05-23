# from django.apps import AppConfig
# from langchain.chains import RetrievalQA
# from langchain.embeddings import GoogleGenerativeAIEmbeddings
# from langchain.vectorstores import Qdrant
# from langchain_google_genai import ChatGoogleGenerativeAI
# from qdrant_client import QdrantClient

# # Connect to Qdrant
# qdrant = Qdrant(
#     client=QdrantClient(host="localhost", port=6333),
#     collection_name="docs",
#     embeddings=GoogleGenerativeAIEmbeddings(model="models/embedding-001")
# )

# # Use Gemini as LLM
# llm = ChatGoogleGenerativeAI(model="gemini-pro")

# # RetrievalQA Chain
# qa = RetrievalQA.from_chain_type(llm=llm, retriever=qdrant.as_retriever())

# # Ask a question
# response = qa.run("What is LangChain?")
# print(response)


# '''
# Act as a {interviewer} experienced in {topic} and have taken many {topic} interviews.
# Give a roadmap of all the topics to prepare including subtopics for a {topic} interview 
# in markdown format with topic title, its importance score, and subtopics to cover.
# '''
# class RoadmapConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'roadmap'


from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)

class RoadmapConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'roadmap'

    def ready(self):
        """
        This method is called when Django starts up and this app is ready.
        It's the ideal place for initialization code that depends on settings
        being fully loaded.
        """
        from .llm_service import LLMManager

        try:
            # Instantiate the LLMManager here. This will trigger its
            # singleton logic and API key initialization.
            # No need to store it in a global variable here, as its methods
            # can be accessed via LLMManager() from anywhere, leveraging the singleton.
            _ = LLMManager()
            logger.info("LLMManager initialized successfully.")
        except EnvironmentError as e:
            logger.error(f"Failed to initialize LLMManager: {e}")
            # Depending on your application's tolerance for missing API keys,
            # you might want to raise an exception here or just log.
            # For a critical dependency, raising is often better.
            # raise e # Uncomment to force app to crash if API key is missing
        except Exception as e:
            logger.error(f"An unexpected error occurred during LLMManager initialization: {e}")
            # raise e