from rest_framework.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path(route="register/", view=views.register, name="user-register"),
    path(route="token/", view=TokenObtainPairView.as_view(), name="get-token"),
    path(route="token/refresh/", view=TokenRefreshView.as_view(), name="refresh-token"),
]
