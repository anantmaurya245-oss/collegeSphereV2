from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering a new User.

    Handles validation of unique email/username and delegates
    user creation to the custom UserManager so that passwords
    are always hashed via set_password().
    """

    password = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
        ]
        read_only_fields = ["id"]

    def validate_email(self, value):
        """
        Ensure the email is not already registered.
        """
        normalized_email = value.lower()

        if User.objects.filter(email=normalized_email).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        return value

    def validate_username(self, value):
        """
        Ensure the username is not already taken.
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")

        return value

    def create(self, validated_data):
        """
        Create the user via the custom manager so that the
        password is hashed and manager-level defaults are applied.
        """
        return User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )


class LoginSerializer(serializers.Serializer):
    """
    Serializer for authenticating an existing User.

    The custom User model uses email as USERNAME_FIELD, so
    authenticate() is called with email instead of username.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"),
            email=email,
            password=password,
        )

        if user is None:
            raise serializers.ValidationError("Invalid email or password.")

        attrs["user"] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Read-only serializer exposing basic profile information
    for the authenticated user.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
        ]
        read_only_fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
        ]