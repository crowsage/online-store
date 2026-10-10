from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            "user",
            "created_at",
            "status",
            "payment_method",
            "transaction_id",
            "payment_status",
            "total",
        ]
