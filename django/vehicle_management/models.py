import uuid
from django.contrib.auth import get_user_model
from django.core import validators
from django.db import models

User = get_user_model()


class Vehicle(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name='owner')
    license_plate = models.CharField( unique=True,
        validators=[validators.MinLengthValidator(5)], max_length=8)
    added_time = models.DateTimeField(auto_now_add=True)
    is_roadsafe = models.BooleanField(default=False)
    passenger_capacity = models.PositiveSmallIntegerField(
        validators=[
            validators.MinValueValidator(1),
            validators.MaxValueValidator(6),
        ]
    )
