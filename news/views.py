from django.http import JsonResponse
from rest_framework import viewsets, permissions
from .models import Preference
from .serializers import PreferenceSerializer
def index(request):
    return JsonResponse({"message": "Welcome to UrNews API"})
class PreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = PreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # return preferences only for the logged-in user
        return Preference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # assign logged-in user automatically
        serializer.save(user=self.request.user)