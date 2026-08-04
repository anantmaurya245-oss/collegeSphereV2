from django.db import models

# Create your models here.
import uuid

from django.conf import settings
from django.db import models


class Post(models.Model):
    """
    Represents a single post created by a user on CampusSphere.

    Each post is authored by a registered user and contains text
    content along with an optional image attachment.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts",
    )

    content = models.TextField(  
        max_length=3000,)

    created_at = models.DateTimeField(
    auto_now_add=True,
    db_index=True,
    )
    

    image = models.ImageField(
        upload_to="posts/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        """
        Return a human-readable representation of the post.
        """
        return f"Post by {self.author.email}"