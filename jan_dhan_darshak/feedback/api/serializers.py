from rest_framework import serializers
from jan_dhan_darshak.feedback.models import DeveloperFeedback, FinancialPointFeedback
from jan_dhan_darshak.core.validators import validator_mobile_number
from jan_dhan_darshak.users.api.serializers import UserSerializer


class DeveloperFeedbackSerializer(serializers.ModelSerializer):
    phone_number = serializers.IntegerField(
        required=True, validators=[validator_mobile_number]
    )

    class Meta:
        model = DeveloperFeedback
        fields = "__all__"
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        return DeveloperFeedback.objects.create(**validated_data)

    def validate_message(self, value):
        # check if message is empty when rating is less than 5
        if self.initial_data["rating"] < 5 and not value:
            raise serializers.ValidationError("Message is required.")

        return value


class FinancialPointFeedbackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialPointFeedback
        exclude = ["user"]
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        return FinancialPointFeedback.objects.create(
            user=self.context["request"].user, **validated_data
        )


class FinancialPointFeedbackListSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = FinancialPointFeedback
        fields = "__all__"
        read_only_fields = ["created_at"]
