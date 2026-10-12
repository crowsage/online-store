from rest_framework.serializers import ModelSerializer, ValidationError
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):

    class Meta:

        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "email": {"required": True},
            "password": {"write_only": True},
        }

    # Validators
    def validate_username(self, value):

        if len(value) < 3:
            raise ValidationError("Username must be or longer then 3 characters.")

        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise ValidationError("This email is already registered.")

        return value

    def validate_password(self, value):

        if len(value) < 8:
            raise ValidationError("Password must be or longer then 8 characters")

        return value

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user
