from rest_framework import serializers
from .models import Journey, Request, Passenger


class JourneySerializer(serializers.ModelSerializer):

    class Meta:
        model = Journey
        fields = ('details',
                  'vehicle',
                  'driver',
                  'passengers',
                  'scheduled_departure_time',
                  'scheduled_arrival_time',
                  'destination',
                  'allowed_gender')

class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = (
            
        )


class PassengerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passenger
        fields = (
            
        )