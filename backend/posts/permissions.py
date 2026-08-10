"""
Permissions for the posts app.

This module contains custom permission classes used to control
access to Post-related API views.
"""

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    """
    Custom object-level permission to only allow authors of a
    Post to edit or delete it.

    Read-only access (GET, HEAD, OPTIONS) is permitted for any
    request. Write access (PATCH, PUT, DELETE) is only granted
    if the requesting user is the author of the object.
    """

    def has_object_permission(self, request, view, obj):
        """
        Return True if the request method is safe, or if the
        requesting user is the author of the given object.
        """
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user