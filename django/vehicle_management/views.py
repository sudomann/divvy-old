import uuid
from rest_framework import generics, permissions

from .models import Vehicle
from .serializers import VehicleSerializer


class IsVehicleOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.owner


class VehicleListorCreate(generics.ListCreateAPIView):
    serializer_class = VehicleSerializer

    def get_queryset(self):
        """
        This view should return a list of all the vehicles
        for the currently authenticated user.
        """
        user = self.request.user
        return Vehicle.objects.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user,
                        uuid=uuid.uuid4())


class VehicleReadWriteDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    permission_classes = (IsVehicleOwner, )
    lookup_field = 'uuid'
