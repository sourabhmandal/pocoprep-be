from django.urls import path

from .views import RoadmapListAPIView, RoadmapDetailAPIView, CreateRoadmapAPIView

urlpatterns = [
    # POST - generate a new roadmap
    path('', CreateRoadmapAPIView.as_view(), name='gemini-chat'),

    # GET - view all roadmaps metadata
    path('all/', RoadmapListAPIView.as_view(), name='roadmap-list'),

    # GET - view a specific roadmap with list of questions
    path('<int:pk>/', RoadmapDetailAPIView.as_view(), name='roadmap-detail'),

    
    # GET - view a specific discussion (chat)
    # path('discuss/<int:chat_id>', views.generate_roadmap, name='generate_roadmap'),
    
    # POST - create a new discussion (chat)
    # path('discuss/', views.generate_roadmap, name='generate_roadmap'),
    
]