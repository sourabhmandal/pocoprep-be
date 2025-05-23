from django.db import models


class Roadmap(models.Model):
    interviewer = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    llm_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Topic(models.Model):
    roadmap = models.ForeignKey(Roadmap, related_name='topics', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    importance_score = models.FloatField()
    # Optionally, you can add more fields as needed

class Subtopic(models.Model):
    topic = models.ForeignKey(Topic, related_name='subtopics', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)