import uuid
from rest_framework import generics, permissions

from .models import Contact
from .serializers import ContactSerializer


class JourneyPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # Allow get requests for all
        if request.method == 'GET':
            return True
        return request.user == obj


class IsContactOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.added_by


class ContactListorCreate(generics.ListCreateAPIView):
    serializer_class = ContactSerializer

    def get_queryset(self):
        """
        This view should return a list of all the contacts
        for the currently authenticated user.
        """
        user = self.request.user
        return Contact.objects.filter(added_by=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(added_by=user,
                        uuid=uuid.uuid4())


class ContactReadWriteDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = ( IsContactOwner, )
    lookup_field = 'uuid'
