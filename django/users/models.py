from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


class Zone(models.Model):
    title = models.CharField(max_length=20)
    details = models.CharField(max_length=100)
    location = models.PointField(unique=True)


class Domain(models.Model):
    fqdn = models.URLField(max_length=30, unique=True)
    details = models.CharField(max_length=100)
    available_zones = models.ManyToManyField(Zone)


class CustomUser(AbstractUser):
    FEMALE = 'F'
    MALE = 'M'
    UNSPECIFIED = 'U'
    GENDER_CHOICES = (
        (FEMALE, 'Female'),
        (MALE, 'Male'),
        (UNSPECIFIED, 'Would rather not disclose')
    )

    username = None
    email = models.EmailField(_('email address'), unique=True)

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    phone = PhoneNumberField()
    is_minor = models.BooleanField(default=True)
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        default=UNSPECIFIED,
    )
    domain = models.ForeignKey(Domain, on_delete=models.PROTECT)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'phone',
        'is_minor',
        'gender',
    ]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
