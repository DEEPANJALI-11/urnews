from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PreferenceViewSet, SavedArticleViewSet, index, register_user, news_feed
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'preferences', PreferenceViewSet, basename='preference')
router.register(r'saved-articles', SavedArticleViewSet, basename='savedarticle')

urlpatterns = [
    path('', index),
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('news-feed/', news_feed, name='news_feed'),  # ✅ this is your endpoint
]
