from rest_framework import serializers
from .models import Comment, Journey, Vehicle, Tracker


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('author', 'content', 'created_time')


class JourneySerializer(serializers.ModelSerializer):

    class Meta:
        model = Journey
        fields = ('details',
                  'vehicle',
                  'driver',
                  'passengers',
                  'scheduled_departure_time',
                  'scheduled_arrival_time',
                  'destination')


class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = ('owner', 'license_plate')


class TrackerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tracker
        fields = ('journey',
                  'last_known_location',
                  'last_updated')
