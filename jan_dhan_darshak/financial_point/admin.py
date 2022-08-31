from django.contrib import admin
from jan_dhan_darshak.financial_point.models import (
    FinancialPoint,
    FinancialPointHoliday,
)
from import_export.admin import ImportExportModelAdmin


class FinancialPointAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = [
        "id",
        "financial_point_name",
        "financial_type",
        "address",
        "email",
        "phone_number",
        "username",
        "unique_id_type",
        "unique_id",
    ]
    list_display_links = ["id", "financial_point_name"]
    list_filter = ["financial_type", "unique_id_type"]
    search_fields = [
        "financial_point_name",
        "address",
        "email",
        "phone_number",
        "username",
        "unique_id",
    ]
    ordering = ["-id", "financial_point_name"]


class FinancialPointHolidayAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ["state", "statedescr", "holiday", "holiday_reason"]


admin.site.register(FinancialPoint, FinancialPointAdmin)
admin.site.register(FinancialPointHoliday, FinancialPointHolidayAdmin)
