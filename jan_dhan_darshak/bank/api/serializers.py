from rest_framework import serializers
from jan_dhan_darshak.bank.models import Bank


class BankDetailSerializer(serializers.Serializer):
    phone_number = serializers.IntegerField(required=False)
    branch = serializers.CharField(required=False)


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"
