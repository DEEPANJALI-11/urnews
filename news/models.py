from django.db import models
from django.contrib.auth.models import User


class Preference(models.Model):
    CATEGORY_CHOICES = [
        ("business", "Business"),
        ("entertainment", "Entertainment"),
        ("general", "General"),
        ("health", "Health"),
        ("science", "Science"),
        ("sports", "Sports"),
        ("technology", "Technology"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.category}"


class SavedArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()
    source = models.CharField(max_length=100, blank=True, null=True)
    published_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.title[:30]}..."
