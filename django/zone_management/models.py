from django.db import models
from django.contrib.gis.db.models import PointField


class Zone(models.Model):
    title = models.CharField(max_length=20)
    details = models.CharField(max_length=100)
    location = PointField(unique=True)
