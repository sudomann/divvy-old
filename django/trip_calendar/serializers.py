from rest_framework import serializers
from .models import Journey


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




