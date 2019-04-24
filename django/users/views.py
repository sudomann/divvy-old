from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets

from .serializers import UserSerializer

User = get_user_model()


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

'''
class UserAccountViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = User.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [
        permissions.IsAccountAdminOrReadOnly,
    ]
'''