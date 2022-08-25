# Register your models here.
from django.contrib import admin
from jan_dhan_darshak.bank.models import Bank
from import_export.admin import ImportExportModelAdmin


class BankAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ["id", "name", "phone_number", "ifsc", "branch"]
    list_display_links = ["id", "name"]
    search_fields = ["name", "ifsc", "branch"]
    ordering = ["-id"]


admin.site.register(Bank, BankAdmin)
