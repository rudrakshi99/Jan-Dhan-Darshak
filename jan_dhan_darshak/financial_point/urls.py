from django.contrib import admin
from django.urls import path
from jan_dhan_darshak.financial_point.api.views import *

app_name = "financial_point"
urlpatterns = [
    path("", financial_point_holiday_view.as_view(), name="financial_point_holiday"),
]
