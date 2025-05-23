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
