from django.db import models
from django.contrib.auth.models import User
from catalog.models import ProductVariant


# Create your models here.
class Order(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("preparing", "Preparing"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    PAYMENT_CHOICES = [
        ("cod", "Cash on Delivery"),
        ("card", "Credit/Debit Card"),
    ]

    PAYMENT_STATUS = [
        ("unpaid", "Unpaid"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    ]

    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")

    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        choices=STATUS_CHOICES,
        default="pending",
        max_length=20,
    )

    payment_method = models.CharField(
        choices=PAYMENT_CHOICES,
        default="cod",
        max_length=20,
    )

    transaction_id = models.CharField(
        blank=True,
        default="",
        max_length=100,
    )

    payment_status = models.CharField(
        choices=PAYMENT_STATUS,
        default="unpaid",
        max_length=20,
    )

    total = models.DecimalField(
        decimal_places=2,
        max_digits=10,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.SET_NULL,
        null=True,
        related_name="order_items",
    )
    unit_price = models.DecimalField(
        decimal_places=2,
        max_digits=10,
    )
    quantity = models.PositiveIntegerField()

    product_name = models.CharField(max_length=200)
    variant_name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.product_name} ({self.variant_name}) x {self.quantity}"
