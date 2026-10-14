from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem
from cart.models import Cart
from rest_framework import status
from django.db import transaction
from .serializers import OrderDetailSerializer, OrderListSerializer
from utils import calculate_delivery_charge
import re


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    user = request.user

    # VALIDATING USER INFO
    full_name = (request.data.get("full_name") or "").strip()
    phone_number = (request.data.get("phone_number") or "").strip()
    city = (request.data.get("city") or "").strip()
    address = (request.data.get("address") or "").strip()
    note = (request.data.get("note") or "").strip()

    if not full_name or not phone_number or not city or not address:
        return Response(
            {"error": "Name, phone number, city and address are required!"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not re.fullmatch(r"03\d{9}", phone_number):
        return Response(
            {"error": "Enter a valid phone number, like 03XXXXXXXXX."}, status=400
        )

    if len(full_name) > 100:
        return Response(
            {"error": "Full name cannot be longer then 100 characters"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if len(city) > 50:
        return Response(
            {"error": "City name cannot be longer then 50 characters"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # GETTING AND VALIDATING PAYMENT METHOD

    payment_method = request.data.get("payment_method")

    if payment_method not in dict(Order.PAYMENT_CHOICES):
        return Response(
            {"error": "Invalid payment method!"}, status=status.HTTP_400_BAD_REQUEST
        )

    # GETTING AND VALIDATING CART ITEMS
    cart, _ = Cart.objects.get_or_create(user=user)
    cart_items = list(cart.items.select_related("variant__product"))

    if not cart_items:
        return Response(
            {"error": "Your cannot order an empty cart"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # CREATING ORDER
    subtotal = sum(item.variant.price * item.quantity for item in cart_items)
    delivery_charge = calculate_delivery_charge(subtotal)
    total = subtotal + delivery_charge

    with transaction.atomic():

        order = Order.objects.create(
            user=user,
            payment_method=payment_method,
            subtotal=subtotal,
            delivery_charge=delivery_charge,
            total=total,
        )

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                variant=item.variant,
                unit_price=item.variant.price,
                quantity=item.quantity,
                product_name=item.variant.product.name,
                variant_name=item.variant.name,
            )

        cart.items.all().delete()

    serializer = OrderDetailSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# LIST ALL ORDERS OF THE REQUESTING USER
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_list(request):

    user = request.user
    orders = Order.objects.filter(user=user)

    serializer = OrderListSerializer(orders, many=True)
    return Response(serializer.data)


# GET MORE DETAIL ABOUT REQUEST ORDER
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):

    user = request.user
    order = get_object_or_404(Order, id=order_id, user=user)

    serializer = OrderDetailSerializer(order)
    return Response(serializer.data)
