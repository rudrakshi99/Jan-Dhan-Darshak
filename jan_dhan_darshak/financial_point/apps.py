from django.apps import AppConfig


class FinancialPointConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "jan_dhan_darshak.financial_point"

    def ready(self):
        import jan_dhan_darshak.financial_point.signals
