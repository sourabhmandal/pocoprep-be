# api/views.py (assuming your chat logic is in the 'api' app)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .llm_service import get_domain_expert_chain # Assuming your chain initialization is here
from .json_service import extract_and_parse_json_from_llm_response, serialize_json_to_db_models # Assuming this function is defined in yaml_service.py


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
            llm_raw_response_object = chain.invoke({"input": """Give a roadmap of all the topics to prepare including subtopics for a {topic} interview for the role of {designation} 
            that is {timeframe} away. in json format with topic title, its importance score, and subtopics to cover.""".format(
                designation=designation,
                topic=topic,
                yoe=yoe,
                timeframe=timeframe
            )})
            parsed_json_data = extract_and_parse_json_from_llm_response(llm_raw_response_object)
            if not parsed_json_data:
                return Response(
                    {'error': 'Failed to extract or parse valid JSON from LLM response.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            created_roadmap_instance = serialize_json_to_db_models(
                parsed_json_data,
                llm_raw_response_object # Pass the original raw string from LLM
            )

            if created_roadmap_instance:
                # Return a success response with the ID of the created roadmap
                return Response(
                    {
                        'message': 'Roadmap generated and saved successfully!',
                        'roadmap_id': created_roadmap_instance.id,
                        'interviewer': created_roadmap_instance.interviewer,
                        'topic': created_roadmap_instance.topic,
                        'generated_data': parsed_json_data # Optionally return the parsed data to client
                    },
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {'error': 'Failed to save roadmap data to the database after parsing.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Return the AI's response as a JSON object
            return Response({'response': parsed_json}, status=status.HTTP_200_OK)

        except Exception as e:
            # Catch and return any errors that occur during the AI interaction
            print(f"Error during Gemini interaction: {e}") # Log the error for debugging
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)