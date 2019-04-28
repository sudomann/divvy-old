from django.contrib.auth import get_user_model
from django.db import models
from comment_thread.models import Comment
from vehicle_management.models import Vehicle
from zone_management.models import Zone


User = get_user_model()


class Journey(models.Model):
    details = models.CharField(max_length=100, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT)
    driver = models.ForeignKey(User, on_delete=models.PROTECT)
    passengers = models.ManyToManyField(User, 
                                        related_name="%(app_label)s_%(class)s_related",
                                        through='Passenger')
    # TODO: Implement gender restriction by driver
    # allowed_genders = 
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

class Passenger(models.Model):
    member = models.ForeignKey(User, on_delete=models.PROTECT)
    journey = models.ForeignKey(Journey, on_delete=models.PROTECT)
    date_joined = models.DateField()
    vehicle_plate_confirmed = models.BooleanField()