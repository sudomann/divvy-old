from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Domain, Zone

User = get_user_model


class DomainSerializer(serializers.ModelSerializer):

    class Meta:
        model = Domain
        fields = ()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ()


class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zone
        fields = ()
