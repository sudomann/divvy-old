from django.db import models
from django.contrib.auth import get_user_model
from users.models import Zone


User = get_user_model()

class Journey(models.Model):
    details = models.CharField(max_length=100, blank=True)
    driver = models.ForeignKey(User, on_delete=models.PROTECT)
    passengers = models.ManyToManyField(User, related_name='passengers')
    scheduled_departure_time = models.DateTimeField()
    scheduled_arrival_time = models.DateTimeField()
    actual_departure_time = models.DateTimeField(blank=True)
    actual_arrival_time = models.DateTimeField(blank=True)
    destination = models.ForeignKey(Zone, on_delete=models.PROTECT) # zone available in
                                          # participants' Domain

    class Meta:
        ordering = ('details',) # TODO: fix this shit

    def __str__(self):
        return self.details