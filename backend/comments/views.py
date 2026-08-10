from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from posts.models import Post

from .models import Comment
from .serializers import CommentSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    """
    List comments for a post or create a new comment.
    """

    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated()]

    def get_queryset(self):
        post_id = self.kwargs["post_id"]

        return Comment.objects.filter(
            post_id=post_id
        ).select_related("author")

    def perform_create(self, serializer):
        post = Post.objects.get(
            pk=self.kwargs["post_id"]
        )

        serializer.save(
            author=self.request.user,
            post=post,
        )


class CommentRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    """
    Retrieve, update or delete a comment.
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(
            author=self.request.user
        )