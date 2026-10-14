from .models import Cart, CartItem
from rest_framework.serializers import ModelSerializer
from catalog.serializers import ProductVariantSerializer


class CartItemSerializer(ModelSerializer):

    variant = ProductVariantSerializer()

    class Meta:
        model = CartItem
        fields = ["id", "variant", "quantity"]


class CartViewSerializer(ModelSerializer):

    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "subtotal", "delivery_charge", "total"]
