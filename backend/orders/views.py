from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem
from catalog.models import CartItem, Cart
from rest_framework import status


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    user = request.user

    # GETTING AND VALIDATING PAYMENT METHOD
    payment_method = request.data.get("payment_method")

    if payment_method not in dict(Order.PAYMENT_CHOICES):
        return Response(
            {"error": "Invalid payment method!"}, status=status.HTTP_400_BAD_REQUEST
        )

    # GETTING AND VALIDATING CART ITEMS
    cart = Cart.objects.get_or_create(user=user)
    items = list(cart.items.select_related("variant__product"))

    if not items:
        return Response(
            {"error": "Your cannot order an empty cart"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # CREATING ORDER
    total = sum(item.variant.price * item.quantity for item in items)

    return Response({"total": total})
