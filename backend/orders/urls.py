from django.urls import path
from .views import create_order, order_list, order_detail

urlpatterns = [
    path("create/", create_order, name="create-order"),
    path("", order_list, name="order-list"),
    path("<int:order_id>/", order_detail, name="order-detail"),
]
