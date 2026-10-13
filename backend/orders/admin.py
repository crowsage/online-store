from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = [
        "variant",
        "unit_price",
        "quantity",
        "product_name",
        "variant_name",
    ]

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# THIS MAKES ORDER MODEL FETCH "USER"
# (to which the order belongs to, for displaying purpose)
# IN THE SAME QUERY WHILE FETCH THE "ORDER" FROM ORDER MODEL


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
    list_filter = ["status"]
    inlines = [OrderItemInline]

    readonly_fields = [
        "user",
        "payment_method",
        "subtotal",
        "delivery_charge",
        "total",
        "created_at",
    ]
