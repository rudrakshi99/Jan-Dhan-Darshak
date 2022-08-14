from rest_framework.serializers import ModelSerializer
from jan_dhan_darshak.saved_locations.models import SavedLocation
from jan_dhan_darshak.users.api.serializers import UserSerializer


class SavedLocationSerializer(ModelSerializer):
    class Meta:
        model = SavedLocation
        fields = "__all__"


class SavedLocationListSerializer(ModelSerializer):
    User = UserSerializer(read_only=True)

    class Meta:
        model = SavedLocation
        fields = ["place_id", "User"]
