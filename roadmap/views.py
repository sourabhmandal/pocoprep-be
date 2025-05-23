# api/views.py (assuming your chat logic is in the 'api' app)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .llm_service import get_domain_expert_chain # Assuming your chain initialization is here

class GeminiChatAPIView(APIView):
    """
    Handles chat interactions with the Gemini 2.0 Flash model using LangChain.
    Accepts POST requests with a 'message' and returns the AI's response.
    """

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests, providing an informational message.
        """
        return Response(
            {'message': 'Please send a POST request with a "message" field to interact with the Gemini chatbot.'},
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests for chat interaction.
        """
        designation = request.data.get('designation')
        topic = request.data.get('topic')
        yoe = request.data.get('yoe')
        timeframe = request.data.get('timeframe')

        # Validate that a message was provided
        if not yoe:
            return Response({'error': 'No years of experience provided'}, status=status.HTTP_400_BAD_REQUEST)

        if not topic:
            return Response({'error': 'No topic provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Initialize the Gemini 2.0 Flash model with a set temperature
            chain = get_domain_expert_chain(0.4, designation, topic, yoe, timeframe) # Make sure this function is correctly imported
            # Invoke the chain to get a response from Gemini
            response = chain.invoke({"input": """Give a roadmap of all the topics to prepare including subtopics for a {topic} interview for the role of {designation} 
            that is {timeframe} away. in yaml format with topic title, its importance score, and subtopics to cover.""".format(
                designation=designation,
                topic=topic,
                yoe=yoe,
                timeframe=timeframe
            )})

            # Return the AI's response as a JSON object
            return Response({'response': response}, status=status.HTTP_200_OK)

        except Exception as e:
            # Catch and return any errors that occur during the AI interaction
            print(f"Error during Gemini interaction: {e}") # Log the error for debugging
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)