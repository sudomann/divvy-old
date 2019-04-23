from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField
from django.db import models
from trip_calendar.models import Journey


User = get_user_model()


class Tracker(models.Model):
    source = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    journey = models.OneToOneField(Journey, on_delete=models.CASCADE)
    last_known_location = PointField()
    last_updated = models.DateTimeField(auto_now=True)
