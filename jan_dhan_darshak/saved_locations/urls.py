from django.urls import path

from jan_dhan_darshak.saved_locations.api.views import SavedLocationsView

app_name = "saved_locations"

urlpatterns = [
    path("", SavedLocationsView.as_view(), name="get_saved"),
]
