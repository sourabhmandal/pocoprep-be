# api/views.py (assuming your chat logic is in the 'api' app)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import StreamingHttpResponse
from rest_framework import status
from rest_framework import generics
from .models import Roadmap, ChatMessage, Subtopic
from .serializers import RoadmapSerializer, RoadmapListSerializer, ChatMessageSerializer, LatestTenMessagesPagination
from .llm_service import get_domain_expert_chain, get_topic_tutor_chain
from .json_service import extract_and_parse_json_from_llm_response, serialize_json_to_db_models
from django.shortcuts import get_object_or_404

class RoadmapListAPIView(generics.ListAPIView):
    """
    API view to list all Roadmap instances.
    GET /roadmap/all
    """
    queryset = Roadmap.objects.all()
    serializer_class = RoadmapListSerializer

class RoadmapDetailAPIView(generics.RetrieveAPIView):
    """
    API view to retrieve a single Roadmap instance by ID.
    GET /api/roadmaps/<int:pk>/
    """
    queryset = Roadmap.objects.all()
    serializer_class = RoadmapSerializer
    # The 'pk' in the URL will map to the 'id' field of the Roadmap model by default.
    lookup_field = 'pk' # This is the default, but explicitly setting it is good practice

class ChatMessageListView(generics.ListAPIView):
    """
    API view to retrieve a paginated list of chat messages for a specific subtopic.
    Requires a 'subtopic_id' in the URL path.
    """
    serializer_class = ChatMessageSerializer
    pagination_class = LatestTenMessagesPagination  # 👈 added this

    def get_queryset(self):
        subtopic_id = self.kwargs.get('subtopic_id')

        if not subtopic_id:
            return ChatMessage.objects.none()

        subtopic = get_object_or_404(Subtopic, pk=subtopic_id)

        queryset = ChatMessage.objects.filter(subtopic=subtopic).order_by('-timestamp')  # latest first
        return queryset

class ChatCreateAPIView(APIView):
    serializer_class = ChatMessageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        subtopic_id = serializer.validated_data['subtopic'].id
        user_message_text = serializer.validated_data['user_message']

        try:
            subtopic = Subtopic.objects.get(id=subtopic_id)
        except Subtopic.DoesNotExist:
            return Response({"error": "Subtopic not found."}, status=status.HTTP_404_NOT_FOUND)

        past_messages_for_llm = []
        for msg in ChatMessage.objects.filter(subtopic=subtopic).order_by('timestamp'):
            past_messages_for_llm.append(msg.user_message)
            past_messages_for_llm.append(msg.llm_response)

        def token_stream():
            nonlocal user_message_text, subtopic, past_messages_for_llm
            full_llm_response = ""
            try:
                chat_chain = get_topic_tutor_chain(
                    topic=subtopic.title,
                    past_messages=past_messages_for_llm
                )

                for chunk in chat_chain.stream({"input": user_message_text}):
                    token = chunk.content if hasattr(chunk, "content") else str(chunk)
                    if token and token.strip():
                        full_llm_response += token
                        yield token

            except Exception as e:
                error_msg = f"[Error communicating with LLM: {str(e)}]"
                full_llm_response = "-- Error occurred while processing your request --"
                yield f"data: {error_msg}\n\n"

            # After streaming, save the full response to the DB
            ChatMessage.objects.create(
                subtopic=subtopic,
                user_message=user_message_text,
                llm_response=full_llm_response,
            )

        return StreamingHttpResponse(
            streaming_content=token_stream(),
            content_type="text/event-stream"
        )


class CreateRoadmapAPIView(APIView):
    """
    Handles chat interactions with the Gemini 2.0 Flash model using LangChain.
    Accepts POST requests with a 'message' and returns the AI's response.
    """
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