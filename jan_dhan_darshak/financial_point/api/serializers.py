from rest_framework.serializers import ModelSerializer
from jan_dhan_darshak.financial_point.models import FinancialPointHoliday


class FinancialPointHolidaySerializer(ModelSerializer):
    class Meta:
        model = FinancialPointHoliday
        fields = ["holiday", "holiday_reason"]
