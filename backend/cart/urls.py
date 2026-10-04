from . import views
from django.urls import path

urlpatterns = [
    path(route="", view=views.view_cart, name="cart-view"),
    path(route="clear/", view=views.clear_cart, name="clear-cart"),
    path(route="update/<int:variant_id>/", view=views.update_cart, name="update-cart"),
]
