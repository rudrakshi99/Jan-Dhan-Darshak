# Create your views here.
from jan_dhan_darshak.bank.models import Bank
from jan_dhan_darshak.bank.utils import get_bank_detail
from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jan_dhan_darshak.bank.api.serializers import BankDetailSerializer, BankSerializer

# Create your views here.


class BankDetailView(APIView):
    queryset = Bank.objects.all()
    serializer_class = BankDetailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        queryset = self.queryset.get(
            phone_number=validated_data.get("phone_number"),
            branch=validated_data.get("branch"),
        )
        data = get_bank_detail(queryset.ifsc)

        return Response(
            response_payload(
                success=True,
                data=data,
                msg="Bank Details Found",
            )
        )
