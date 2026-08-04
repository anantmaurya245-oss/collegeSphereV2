from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post model.

    Handles serialization and validation of Post instances,
    exposing content and image fields for write operations while
    keeping system-managed fields read-only.
    """

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "content",
            "image",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "author",
            "created_at",
            "updated_at",
        ]
        