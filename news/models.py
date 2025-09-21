from django.db import models
from django.contrib.auth.models import User


class Preference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # link to user
    category = models.CharField(max_length=100)
    keywords = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.category}"


class SavedArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_articles')
    title = models.CharField(max_length=255)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title