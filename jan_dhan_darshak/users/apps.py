from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "jan_dhan_darshak.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import jan_dhan_darshak.users.signals  # noqa F401
        except ImportError:
            pass
