from rest_framework import serializers
from .models import Preference

class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = ['id', 'user', 'category']
        read_only_fields = ['user']  # user will be set automatically
