from django.contrib import admin
from django.urls import path
from jan_dhan_darshak.missing_suggestions.api.views import missingSuggestion, trackSuggestion,groupTrack

app_name = "missing_suggestions"
urlpatterns = [
    path('', missingSuggestion.as_view(), name='missingSuggestion'),
    path('track/', trackSuggestion.as_view(), name='missingSuggestion'),
    path('mailtrack/', groupTrack.as_view(), name='groupMissingSuggestion'),
]
