from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PreferenceViewSet, index

router = DefaultRouter()
router.register(r'preferences', PreferenceViewSet, basename='preference')


urlpatterns = [
    path('', index),
    path('',include(router.urls)),
          # root of /api/ will call index view
]
