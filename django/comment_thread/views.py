import uuid
from rest_framework import generics, permissions

from .models import Comment
from .serializers import CommentSerializer


class IsCommentOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class CommentListorCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the comments
        for the journey.
        """
        user = self.request.user
        return Comment.objects.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user,
                        uuid=uuid.uuid4())


class CommentReadWriteDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsCommentOwner, )
    lookup_field = 'uuid'
