from django.urls import path

from .views import (
    CommentListCreateView,
    CommentRetrieveUpdateDestroyView,
)

urlpatterns = [
    path(
        "posts/<uuid:post_id>/comments/",
        CommentListCreateView.as_view(),
        name="comment_list_create",
    ),

    path(
        "<int:pk>/",
        CommentRetrieveUpdateDestroyView.as_view(),
        name="comment_detail",
    ),
]