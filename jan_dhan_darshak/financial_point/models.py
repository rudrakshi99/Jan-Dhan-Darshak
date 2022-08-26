from django.db import models


FINANCIAL_TYPE = (
    ("Bank", "Bank"),
    ("ATM", "ATM"),
    ("CSC", "CSC"),
    ("PO", "Post Office"),
    ("Bank_Mitra", "Bank Mitra"),
)

ID_TYPE = (
    ("IFSC", "IFSC"),
    ("CSC_Id", "CSC Id"),
    ("PIN_Code", "PIN Code"),
)


class FinancialPoint(models.Model):
    financial_type = models.CharField(choices=FINANCIAL_TYPE, max_length=20)
    financial_point_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    phone_number = models.CharField(max_length=10)
    username = models.CharField(max_length=100)
    unique_id_type = models.CharField(choices=ID_TYPE, max_length=20)
    unique_id = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Financial Points"
        ordering = ["-id"]

    def __str__(self):
        return self.financial_point_name


class FinancialPointHoliday(models.Model):
    state = models.CharField(max_length=10)
    statedescr = models.CharField(max_length=200)
    holiday = models.CharField(max_length=200)
    holiday_reason = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.statedescr
