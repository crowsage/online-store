from django.contrib import admin
from .models import Order, OrderItem

# Register your models here.


admin.site.register(OrderItem)

# THIS MAKES ORDER MODEL FETCH "USER"
# (to which the order belongs to, for displaying purpose)
# IN THE SAME QUERY WHILE FETCH THE "ORDER" FROM ORDER MODEL


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
