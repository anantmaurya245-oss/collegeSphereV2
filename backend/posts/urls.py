from django.urls import path
from .views import (
    CreatePostView,
    MyPostsView,
    PostListView,
    PostRetrieveUpdateDestroyView,
    LikePostView,
)
app_name = "posts"

urlpatterns = [
    path(
        "",
        PostListView.as_view(),
        name="post_list",
    ),
    path(
        "create/",
        CreatePostView.as_view(),
        name="create_post",
    ),
    path(
    "my-posts/",
    MyPostsView.as_view(),
    name="my_posts",
    ),
    path(
    "<uuid:pk>/like/",
    LikePostView.as_view(),
    name="like_post",
    ),
    path(
        "<uuid:pk>/",
        PostRetrieveUpdateDestroyView.as_view(),
        name="post_detail",
    ),
]