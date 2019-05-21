from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Journey
from .serializers import JourneySerializer


class AllJourneyView(generics.ListCreateAPIView):
    
    serializer_class = JourneySerializer
    queryset = Journey.objects.all()
    permission_classes = (IsAuthenticated,)

class JourneyView(generics.CreateAPIView):
    
    serializer_class = JourneySerializer
    queryset = Journey.objects.all()
    permission_classes = (IsAuthenticated,)