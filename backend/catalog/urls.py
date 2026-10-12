from django.urls import path
from .views import category_list, product_list, product_detail

urlpatterns = [
    path("categories/", category_list, name="category_list"),
    path("", product_list, name="product_list"),
    path("<slug:slug>/", product_detail, name="product-detail"),
]
