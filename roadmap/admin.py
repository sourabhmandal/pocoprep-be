from django.contrib import admin
from .models import Roadmap, Topic, Subtopic, ChatMessage

# Register your models here.
admin.site.register([
    Roadmap,
    Topic,
    Subtopic,
    ChatMessage,
])