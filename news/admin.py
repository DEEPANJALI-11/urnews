from django.contrib import admin
from .models import Preference, SavedArticle

admin.site.register(Preference)
admin.site.register(SavedArticle)
