from django.urls import path

from .views import GeminiChatAPIView

urlpatterns = [
    # POST - generate a new roadmap
    path('', GeminiChatAPIView.as_view(), name='gemini-chat'),

    # # GET - view all roadmaps metadata
    # path('', views.view_roadmaps, name='view_roadmaps'),
    
    # # GET - view a specific roadmap with list of questions
    # path('/<int:roadmap_id>/', views.view_roadmap, name='view_roadmap'),
    
    # # GET - view a specific discussion (chat)
    # path('discuss/<int:chat_id>', views.generate_roadmap, name='generate_roadmap'),
    
    # # POST - create a new discussion (chat)
    # path('discuss/', views.generate_roadmap, name='generate_roadmap'),
    
]