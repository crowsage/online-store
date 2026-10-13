from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ["id", "product_name", "variant_name", "unit_price", "quantity"]


class OrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            "id",
            "created_at",
            "status",
            "payment_status",
            "total",
        ]


class OrderDetailSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "created_at",
            "status",
            "payment_method",
            "transaction_id",
            "payment_status",
            "items",
            "subtotal",
            "delivery_charge",
            "total",
        ]
