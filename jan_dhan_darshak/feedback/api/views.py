from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from jan_dhan_darshak.feedback.models import DeveloperFeedback, FinancialPointFeedback
from jan_dhan_darshak.feedback.api.serializers import (
    DeveloperFeedbackSerializer,
    FinancialPointFeedbackListSerializer,
    FinancialPointFeedbackCreateSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from django_filters import rest_framework as filters


class DeveloperFeedbackView(generics.CreateAPIView):

    queryset = DeveloperFeedback.objects.all()
    serializer_class = DeveloperFeedbackSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        feedback_form = serializer.create(validated_data)

        feedback_form = DeveloperFeedbackSerializer(feedback_form).data

        return Response(
            response_payload(
                success=True, data=feedback_form, msg="Thanks for the feedback."
            ),
            status=status.HTTP_200_OK,
        )


class FinancialPointFeedbackCreateView(generics.CreateAPIView):

    queryset = FinancialPointFeedback.objects.all()
    serializer_class = FinancialPointFeedbackCreateSerializer

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            feedback_form = serializer.create(validated_data)

            feedback_form = FinancialPointFeedbackCreateSerializer(feedback_form).data

            return Response(
                response_payload(
                    success=True, data=feedback_form, msg="Thanks for the feedback."
                ),
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                response_payload(success=False, msg=f"{e}"),
                status=status.HTTP_400_BAD_REQUEST,
            )


class FinancialPointFeedbackListView(generics.ListAPIView):
    queryset = FinancialPointFeedback.objects.all()
    serializer_class = FinancialPointFeedbackListSerializer
    filter_backends = [SearchFilter, OrderingFilter, filters.DjangoFilterBackend]
    search_fields = [
        "financial_point_name",
        "unique_id",
        "user__username",
        "user__email",
    ]
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset_list = self.queryset.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(financial_point_name__icontains=query)
                | Q(unique_id__icontains=query)
                | Q(user__username__icontains=query)
                | Q(user__email__icontains=query)
                | Q(user__phone_number__icontains=query)
            ).distinct()
        return queryset_list

    def get_serializer_class(self):
        return self.serializer_class

    def get_serializer_context(self):
        return {"request": self.request}

    def get_paginated_response(self, data):
        return Response(
            response_payload(success=True, data=data, msg="List of financial points."),
            status=status.HTTP_200_OK,
        )
