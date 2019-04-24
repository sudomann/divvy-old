from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _
from domain_management.models import Domain
from phonenumber_field.modelfields import PhoneNumberField


from .managers import CustomUserManager


class CustomUser(AbstractUser):
    
    # Raise field-specific validation errors if those 
    # fields don’t appear in a ModelForm
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
