from rest_framework.serializers import ModelSerializer

from jan_dhan_darshak.saved_locations.models import SavedLocation

class SavedLocationSerializer(ModelSerializer):

    class Meta:
        model = SavedLocation
        fields = '__all__'
        


