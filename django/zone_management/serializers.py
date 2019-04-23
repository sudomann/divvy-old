from rest_framework import serializers
from zone_management.models import Zone

class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zone
        fields = ('title', 'details', 'location')