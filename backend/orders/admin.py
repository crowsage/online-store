from django.contrib import admin
from .models import Order, OrderItem


# Register your models here.
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    readonly_fields = [
        "order",
        "variant",
        "unit_price",
        "quantity",
        "product_name",
        "variant_name",
    ]


# THIS MAKES ORDER MODEL FETCH "USER"
# (to which the order belongs to, for displaying purpose)
# IN THE SAME QUERY WHILE FETCH THE "ORDER" FROM ORDER MODEL


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
    list_filter = ["status"]

    readonly_fields = [
        "user",
        "payment_method",
        "transaction_id",
        "total",
        "created_at",
    ]
