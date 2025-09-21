# news/views.py
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, permissions
from .models import Preference, SavedArticle
from .serializers import PreferenceSerializer, SavedArticleSerializer

NEWS_API_KEY="e5ad6a5d7fff4d03bc1c2c5c63e76428"
# Test API
@api_view(['GET'])
def index(request):
    return Response({"message": "Welcome to UrNews API"})

# User registration
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

# Preferences
class PreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = PreferenceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Preference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Saved Articles
class SavedArticleViewSet(viewsets.ModelViewSet):
    serializer_class = SavedArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only articles for the logged-in user
        return SavedArticle.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save the article for the current user automatically
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def news_feed(request):
    user = request.user
    prefs = Preference.objects.filter(user=user)
    categories = [p.category for p in prefs]

    if not categories:
        return Response({"message": "No news found. Add some preferences first!", "articles": []})

    all_articles = []

    for category in categories:
        url = (
            f"https://newsapi.org/v2/top-headlines?"
            f"q={category}&"
            f"language=en&"
            f"apiKey={NEWS_API_KEY}"
        )
        res = requests.get(url)
        if res.status_code == 200:
            data = res.json()
            articles = data.get("articles", [])
            all_articles.extend(articles)

    return Response({"articles": all_articles})