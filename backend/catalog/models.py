from django.db import models
from django.utils.text import slugify


# Product must have category it belongs to
class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# ofcourse
class Product(models.Model):

    name = models.CharField(max_length=200, unique=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    description = models.TextField()
    category = models.ForeignKey(
        to=Category, on_delete=models.PROTECT, related_name="products"
    )
    active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def min_price(self):
        variants = self.variants.all()
        if not variants:
            return 0
        return min(variant.price for variant in variants)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# Product have different variants
class ProductVariant(models.Model):
    product = models.ForeignKey(
        to=Product, on_delete=models.CASCADE, related_name="variants"
    )
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} ({self.name})"
