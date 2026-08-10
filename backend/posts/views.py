# Create your views here.
"""
Views for the posts app.

This module contains API views responsible for handling
Post-related HTTP requests.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics


from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    SAFE_METHODS,
)


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
class MyPostsView(generics.ListAPIView):
    """
    API view for listing only the authenticated user's posts.
    """

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(
            author=self.request.user
        ).order_by("-created_at")

class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a single Post.

    Read access (GET, HEAD, OPTIONS) is open to any user,
    authenticated or not. Write access (PATCH, PUT) and delete
    access (DELETE) are restricted to authenticated users who
    are the author of the Post, as enforced by the
    IsAuthorOrReadOnly permission.
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_permissions(self):
        """
        Instantiate and return the list of permissions required
        for the current request.

        Safe methods (GET, HEAD, OPTIONS) are open to any user.
        Unsafe methods (PATCH, PUT, DELETE) require the requesting
        user to be authenticated and to be the author of the
        target Post.
        """
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]

        return [IsAuthenticated(), IsAuthorOrReadOnly()]
class LikePostView(APIView):
    """
    Toggle like/unlike for a post.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(
                {"detail": "Post not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            liked = False
        else:
            post.likes.add(request.user)
            liked = True

        return Response(
            {
                "liked": liked,
                "likes_count": post.likes.count(),
            },
            status=status.HTTP_200_OK,
        )