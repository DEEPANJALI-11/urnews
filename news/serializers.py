from rest_framework import serializers
from .models import Preference, SavedArticle

class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'
        read_only_fields = ['user']

class SavedArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedArticle
        fields = '__all__'
        read_only_fields = ['user']
