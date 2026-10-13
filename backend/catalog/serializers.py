from . import models
from rest_framework import serializers


# FOR CATEGORY MODEL
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["id", "name", "slug"]


# PRODUCT SERIALIZER TO USE WHEN RETURNING PRODUCT VARIANT IN CART
class ProductBasicSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = ["id", "name", "image", "slug"]


# FOR PRODUCT VARIANT MODEL
class ProductVariantSerializer(serializers.ModelSerializer):
    product = ProductBasicSerializer()

    class Meta:
        model = models.ProductVariant
        fields = ["id", "name", "price", "product", "in_stock"]


# SERIALIZER FOR PRODUCT LIST
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ["id", "name", "image", "category", "slug", "created_at", "min_price"]


# SERIALIZER FOR PRODUCT LIST
class ProductDetailSerializer(serializers.ModelSerializer):

    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = models.Product
        fields = [
            "id",
            "name",
            "image",
            "description",
            "category",
            "slug",
            "created_at",
            "variants",
        ]
