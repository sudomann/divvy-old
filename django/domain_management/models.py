from django.db import models
from django.core.validators import RegexValidator
from zone_management.models import Zone


class Domain(models.Model):
    hostname = models.CharField(max_length=30,
                                unique=True,
                                validators=[
                                    RegexValidator(regex='^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$',
                                                   message="Invalid hostname"
                                                   )
                                ]
                                )
    details = models.CharField(max_length=100)
    available_zones = models.ManyToManyField(Zone, blank=True)
