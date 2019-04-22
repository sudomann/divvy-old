from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField
from django.core.validators import MinLengthValidator
from django.db import models

from users.models import Zone


User = get_user_model()


class Vehicle(models.Model):
    owner = models.ForeignKey(User, on_delete=models.PROTECT)
    license_plate = models.CharField(
        validators=[MinLengthValidator(5)], max_length=8)
    added_time = models.DateTimeField(auto_now_add=True)
    is_roadsafe = models.BooleanField(default=False)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    content = models.CharField(max_length=100)
    created_time = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)


class Journey(models.Model):
    details = models.CharField(max_length=100, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT)
    driver = models.ForeignKey(User, on_delete=models.PROTECT)
    passengers = models.ManyToManyField(User, related_name='passengers')
    scheduled_departure_time = models.DateTimeField()
    scheduled_arrival_time = models.DateTimeField()
    actual_departure_time = models.DateTimeField(blank=True)
    actual_arrival_time = models.DateTimeField(blank=True)
    destination = models.ForeignKey(Zone, on_delete=models.PROTECT)
    comments = models.ManyToManyField(Comment)

    class Meta:
        ordering = ('details',)  # TODO: fix this shit

    def __str__(self):
        return self.details


class Tracker(models.Model):
    source = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    journey = models.OneToOneField(Journey, on_delete=models.CASCADE)
    last_known_location = PointField()
    last_updated = models.DateTimeField(auto_now=True)
