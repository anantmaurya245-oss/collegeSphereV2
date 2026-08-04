

# Create your views here.
"""
Views for the posts app.

This module contains API views responsible for handling
Post-related HTTP requests.
"""

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Post
from .serializers import PostSerializer


class CreatePostView(generics.CreateAPIView):
    """
    API view for creating a new Post.

    Only authenticated users are permitted to create posts.
    The authenticated user making the request is automatically
    set as the author of the post.
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Save the new Post instance, setting the current
        authenticated user as the author.
        """
        serializer.save(author=self.request.user)
class PostListView(generics.ListAPIView):
    """
    API view for listing all posts.
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]