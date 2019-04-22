from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Contact, Domain, Zone

User = get_user_model


class DomainSerializer(serializers.ModelSerializer):

    class Meta:
        model = Domain
        fields = ('hostname', 'details')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'gender')


class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zone
        fields = ('title', 'details', 'location')


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ('first_name',
                  'last_name',
                  'email',
                  'phone')
