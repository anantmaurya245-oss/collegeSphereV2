from django.db import models

# Create your models here.
from django.conf import settings

class Follow(models.Model):
    """
    Represents one user following another user.
    """

    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="following",
    )

    following = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="followers",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["follower", "following"],
                name="unique_user_follow",
            )
        ]

        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.follower.username} follows "
            f"{self.following.username}"
        )