from django.contrib.auth import get_user_model
from rest_framework import generics
from .models import Domain, Zone
from .serializers import DomainSerializer, UserSerializer, ZoneSerializer

User = get_user_model()


class DomainList(generics.ListCreateAPIView):
    queryset = Domain.objects.all()
    serializer_class = Domain


class DomainDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
