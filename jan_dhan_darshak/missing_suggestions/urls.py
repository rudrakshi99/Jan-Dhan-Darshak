from django.contrib import admin
from django.urls import path
from jan_dhan_darshak.missing_suggestions.api.views import missingSuggestion, trackSuggestion,groupTrack,MapSuggestions

app_name = "missing_suggestions"
urlpatterns = [
    path('', missingSuggestion.as_view(), name='missingSuggestion'),
    path('track/', trackSuggestion.as_view(), name='missingSuggestion'),
    path('usertrack/', groupTrack.as_view(), name='groupMissingSuggestion'),
    path('mapsuggestion/', MapSuggestions.as_view(), name='mapSuggestions'),
]
