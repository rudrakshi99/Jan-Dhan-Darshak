from django.urls import path

from jan_dhan_darshak.saved_locations.api.views import SavedLocationsView,GetSavedLocationsView

app_name = 'saved_locations'

urlpatterns = [
    path('create/', SavedLocationsView.as_view(), name='create_saved'),
    path('', GetSavedLocationsView.as_view(), name='get_saved'),
    path('delete/<int:User>/<int:place_id>/', SavedLocationsView.as_view(), name='delete_saved'),
]
