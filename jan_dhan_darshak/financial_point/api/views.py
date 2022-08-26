from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jan_dhan_darshak.financial_point.api.serializers import (
    FinancialPointHolidaySerializer,
)
from jan_dhan_darshak.financial_point.models import FinancialPointHoliday


class financial_point_holiday_view(APIView):
    def get(self, request):
        try:
            state = request.GET.get("state")
            financial_point_holiday = FinancialPointHoliday.objects.all()
            serializer = FinancialPointHolidaySerializer(
                financial_point_holiday, many=True
            )
            return Response(
                response_payload(
                    success=True,
                    data=serializer.data,
                    msg="Here are you Holidays!",
                ),
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                response_payload(
                    success=False,
                    data=str(e),
                    msg="error while getting!",
                ),
                status=status.HTTP_400_BAD_REQUEST,
            )
