from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(
        source="author.username",
        read_only=True,
    )

    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "content",
            "image",
            "likes_count",
            "is_liked",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "author",
            "likes_count",
            "is_liked",
            "created_at",
            "updated_at",
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        return obj.likes.filter(
            id=request.user.id
        ).exists()