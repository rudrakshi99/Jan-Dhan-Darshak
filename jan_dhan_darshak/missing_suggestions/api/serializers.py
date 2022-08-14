from rest_framework import serializers
from jan_dhan_darshak.missing_suggestions.models import MissingSuggestions


class MissingSuggestionsSerializer(serializers.ModelSerializer):
    suggestion_status = serializers.CharField(
        source="get_suggestion_status_display", read_only=True
    )

    class Meta:
        model = MissingSuggestions
        # fields='__all__'
        exclude = ["created_at", "updated_at"]
