from rest_framework import serializers
from .models import Comment, Journey, Vehicle, Tracker

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ()

class JourneySerializer(serializers.ModelSerializer):

    class Meta:
        model = Journey
        fields = ()

class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = ()

class TrackerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tracker
        fields = ()