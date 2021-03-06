from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _
from domain_management.models import Domain
from phonenumber_field.modelfields import PhoneNumberField


from .managers import CustomUserManager
from .validators import is_hostname_supported, validate_value_is_False


class CustomUser(AbstractUser):

    # Manager calls full_clean()
    # which in turn calls clean_fields()
    # which validates the hostname in email
    # Thus it's safe to set it here with the
    # guarantee that it exists
    def clean(self):
        email_hostname = self.email.partition('@')[2]
        self.domain = Domain.objects.get(hostname=email_hostname)

    FEMALE = 'F'
    MALE = 'M'
    UNSPECIFIED = 'U'
    GENDER_CHOICES = (
        (UNSPECIFIED, 'Would rather not disclose'),
        (FEMALE, 'Female'),
        (MALE, 'Male')        
    )

    username = None
    email = models.EmailField(_('email address'),
                              unique=True,
                              validators=[is_hostname_supported])

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    phone = PhoneNumberField()
    is_minor = models.BooleanField(validators=[validate_value_is_False])
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
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
