from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartViewSerializer
from catalog.models import ProductVariant
from rest_framework import status
from constants import MAX_ORDER_LIMIT


# For viewing your cart
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_cart(request):

    user = request.user
    cart, created = Cart.objects.get_or_create(user=user)

    serialzer = CartViewSerializer(cart)

    return Response(serialzer.data)


# FOR ACTIONS LIKE CHANGING QUANTITY OR ADD OR REMOVING ITEM
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_cart(request, variant_id):

    variant = ProductVariant.objects.filter(id=variant_id).first()
    if not variant:
        return Response(
            {"message": "product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    user = request.user
    cart, created_cart = Cart.objects.get_or_create(user=user)
    cart_item = CartItem.objects.filter(cart=cart, variant_id=variant_id).first()

    quantity = request.data.get("quantity", 1)
    try:
        quantity = int(quantity)
    except ValueError:
        return Response(
            {"message": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST
        )

    if quantity <= 0:
        if cart_item:
            cart_item.delete()

    elif quantity > MAX_ORDER_LIMIT:
        return Response(
            {"message": f"Max order limit is {MAX_ORDER_LIMIT}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    else:
        if cart_item:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            CartItem.objects.create(
                cart=cart,
                quantity=quantity,
                variant_id=variant_id,
            )

    serializer = CartViewSerializer(cart)
    return Response(serializer.data)


# FOR REMOVING ALL ITEMS FROM THE CART
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    pass
