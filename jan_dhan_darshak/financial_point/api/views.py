from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jan_dhan_darshak.financial_point.api.serializers import (
    FinancialPointHolidaySerializer,
)
from jan_dhan_darshak.financial_point.models import FinancialPointHoliday
from datetime import datetime




class financial_point_holiday_view(APIView):
    def get(self, request):
        try:
            state = request.query_params.get("state")
            financial_point_holiday = FinancialPointHoliday.objects.filter(state=state)
            response = []

            for holiday in financial_point_holiday:
                holiday_date = holiday.holiday + " 00:00:00"
                date_time_obj = datetime.strptime(holiday_date, "%d-%m-%Y %H:%M:%S")

                detail = {
                    "holiday": date_time_obj.strftime("%Y-%m-%d"),
                    "holiday_reason": holiday.holiday_reason,
                }
                response.append(detail)

            return Response(
                response_payload(
                    success=True,
                    data=response,
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
