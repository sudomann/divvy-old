from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from .models import Domain, Zone
from .serializers import DomainSerializer, UserSerializer, ZoneSerializer

User = get_user_model()


class DomainList(generics.ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = Domain
    permission_classes = (permissions.AllowAny)


class DomainDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = (permissions.AllowAny, )