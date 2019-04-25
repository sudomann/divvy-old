from rest_framework import generics, permissions

from .models import Domain
from .serializers import DomainSerializer,


class DomainList(generics.ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = Domain
    permission_classes = (permissions.AllowAny)


class DomainDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = (permissions.AllowAny, )
