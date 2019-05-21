from rest_framework import serializers

from .models import Vehicle


class VehicleSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Vehicle

        fields = ('uuid',
                  'license_plate',
                  'is_roadsafe',
                  'passenger_capacity',
                  'is_roadsafe',)

        read_only_fields = ('uuid',)
