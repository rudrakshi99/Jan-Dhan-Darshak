from django.contrib import admin

from jan_dhan_darshak.feedback.models import DeveloperFeedback, FinancialPointFeedback


class FinancialPointFeedbackAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "financial_point_name",
        "financial_type",
        "unique_id_type",
        "unique_id",
        "created_at",
    ]
    list_display_links = ["id", "financial_point_name"]
    list_filter = ["financial_type", "unique_id_type"]
    search_fields = [
        "financial_point_name",
        "unique_id",
        "user__username",
        "user__email",
    ]
    ordering = ["-id", "financial_point_name", "created_at"]

    class Meta:
        model = FinancialPointFeedback


admin.site.register(DeveloperFeedback)
admin.site.register(FinancialPointFeedback, FinancialPointFeedbackAdmin)
