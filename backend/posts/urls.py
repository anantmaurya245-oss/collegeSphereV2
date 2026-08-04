from django.urls import path

from .views import CreatePostView, PostListView

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
]