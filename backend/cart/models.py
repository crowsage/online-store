from django.db import models
from django.contrib.auth.models import User
from catalog.models import ProductVariant
from utils import calculate_delivery_charge


# EACH USER CAN HAVE ONLY 1 CART
class Cart(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")

    @property
    def subtotal(self):
        return sum(
            item.variant.price * item.quantity
            for item in self.items.select_related("variant")
        )

    @property
    def delivery_charge(self):
        return calculate_delivery_charge(self.subtotal)

    @property
    def total(self):
        return self.subtotal + self.delivery_charge


# CART ITEM POINTS TO CART AND MULTIPLE CART ITEMS CAN POINT TO SAME CART
class CartItem(models.Model):

    variant = models.ForeignKey(
        ProductVariant, on_delete=models.PROTECT, related_name="in_cart"
    )
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    quantity = models.IntegerField()
