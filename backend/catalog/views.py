from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product, Category
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    CategorySerializer,
)
from django import http
from django.db.models import Count


# RETURN ALL PRODUCTS (OR CATERGORY WITH QUERY PARAM)
@api_view(["GET"])
@permission_classes([AllowAny])
def product_list(request):

    category = request.GET.get("category")

    # Getting all the products first
    products = Product.objects.annotate(variant_count=Count("variants")).filter(
        active=True, variant_count__gt=0
    )

    if category:
        products = products.filter(category__slug=category)

    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)


# RETURN DETAILS OF A SINGLE PRODUCT
@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request, slug):

    product = get_object_or_404(Product, slug=slug)
    serializer = ProductDetailSerializer(product)

    return Response(serializer.data)


# RETURN ALL THE CATEGORIES ACTIVE
@api_view(["GET"])
@permission_classes([AllowAny])
def category_list(request):

    categories = Category.objects.filter(products__active=True).distinct()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)
