from rest_framework import serializers
from jan_dhan_darshak.missing_suggestions.models import MissingSuggestions
from jan_dhan_darshak.users.api.serializers import UserSerializer
from jan_dhan_darshak.users.models import User
class MissingSuggestionsSerializer(serializers.ModelSerializer):
    suggestion_status=serializers.CharField(source='get_suggestion_status_display',read_only=True)
    # User=UserSerializer()
    class Meta:
        model=MissingSuggestions
        # fields='__all__'
        exclude=['created_at','updated_at']
        # depth=1


# {
#         "User":1,
#         "pointName":"asd",
#         "address": "dasd",
#         "otherdetails":"asd",
#         "latitude": 12.1211222,
#         "longitude": 121.1232123
# }