from django.contrib import admin

from jan_dhan_darshak.feedback.models import DeveloperFeedback, FinancialPointFeedback
from jan_dhan_darshak.financial_point.models import FinancialPoint


@admin.register(FinancialPointFeedback)
class FinancialPointFeedbackAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "financial_point_name",
        "financial_type",
        "unique_id_type",
        "unique_id",
        "created_at",
        "audio_message",
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

    def get_queryset(self, request):
        qs = super(FinancialPointFeedbackAdmin, self).get_queryset(request)
        try:
            fp = FinancialPoint.objects.get(
                phone_number=request.user.phone_number, email=request.user.email
            )
            qs = qs.filter(
                financial_type=fp.financial_type,
                financial_point_name=fp.financial_point_name,
                unique_id_type=fp.unique_id_type,
                unique_id=fp.unique_id,
            )
        except FinancialPoint.DoesNotExist:
            pass
        return qs

    class Meta:
        model = FinancialPointFeedback


admin.site.register(DeveloperFeedback)
