from django.urls import path

from .views import RoadmapListAPIView, RoadmapDetailAPIView, CreateRoadmapAPIView, ChatMessageListView, ChatCreateAPIView

urlpatterns = [
    # POST - generate a new roadmap
    path('', CreateRoadmapAPIView.as_view(), name='gemini-chat'),

    # GET - view all roadmaps metadata
    path('all/', RoadmapListAPIView.as_view(), name='roadmap-list'),

    # GET - view a specific roadmap with list of questions
    path('<int:pk>/', RoadmapDetailAPIView.as_view(), name='roadmap-detail'),

    
    # GET - view a specific discussion (chat)
    path('discuss/<int:subtopic_id>/', ChatMessageListView.as_view(), name='subtopic_chat_list'),
    path('discuss', ChatCreateAPIView.as_view(), name='chat_create'), # New URL for creating chat messages

    # POST - create a new discussion (chat)
    # path('discuss/', views.generate_roadmap, name='generate_roadmap'),
    
]