from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


class Zone(models.Model):
    title = models.CharField(max_length=20)
    details = models.CharField(max_length=100)
    location = models.PointField(unique=True)


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


class CustomUser(AbstractUser):

    def clean_fields(self, exclude=None):

        super().clean_fields(exclude=exclude)

        email_hostname = self.email.partition('@')[2]
        # automatically set `domain` ForeignKey to existing Domain record
        # Raises ValidationError if nonexistent
        try:
            self.domain = Domain.objects.get(hostname=email_hostname)
        except:  # models.Domain.DoesNotExist:
            raise ValidationError({'domain':
                                   _('\"{}\" emails are not supported on this service.'.format(
                                       email_hostname))
                                   }
                                  )

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
        default=UNSPECIFIED
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
