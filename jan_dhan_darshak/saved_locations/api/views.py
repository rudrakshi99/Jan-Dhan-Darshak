from rest_framework.views import APIView
from jan_dhan_darshak.saved_locations.models import SavedLocation
from .serializers import SavedLocationSerializer, SavedLocationListSerializer
from jan_dhan_darshak.core.utils import response_payload
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Create your views here.
class SavedLocationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            User = request.GET.get("User")
            data = SavedLocation.objects.filter(User=User)
            serializer = SavedLocationListSerializer(data, many=True)
            return Response(
                response_payload(
                    success=True,
                    data=serializer.data,
                    msg="All saved locations by user",
                ),
                status=status.HTTP_200_OK,
            )
        except Exception:
            return Response(
                response_payload(success=False, msg="Error While Getting!"),
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):

        try:

            data = request.data
            rec = SavedLocation.objects.filter(
                User=data["User"], place_id=data["place_id"]
            )
            if len(rec) == 0:
                serializer = SavedLocationSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(
                        response_payload(
                            success=True,
                            data=serializer.data,
                            msg="You have saved the location successfully!",
                        ),
                        status=status.HTTP_201_CREATED,
                    )
            else:
                return Response(
                    response_payload(success=True, msg="You have already saved this!"),
                    status=status.HTTP_201_CREATED,
                )
        except Exception:
            return Response(
                response_payload(success=False, msg="Error While Creating!"),
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request, **kwargs):
        try:
            User = request.GET.get("User")
            place_id = request.GET.get("place_id")
            data = SavedLocation.objects.filter(User=User, place_id=place_id)
            data.delete()
            return Response(
                response_payload(success=True, msg="Removed successfully!"),
                status=status.HTTP_200_OK,
            )
        except Exception:
            return Response(
                response_payload(success=False, msg="Error While Deleting!"),
                status=status.HTTP_400_BAD_REQUEST,
            )
