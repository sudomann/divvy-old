from django.core.exceptions import ValidationError
from domain_management.models import Domain
from django.utils.translation import ugettext_lazy as _


def is_hostname_supported(email):
    email = email.strip().lower() # Normalize email first
    email_hostname = email.partition('@')[2]

    if not Domain.objects.filter(hostname=email_hostname).exists():
        raise ValidationError(
            _("\"{}\". Your school is not supported on this service.".format(
                email_hostname))
        )
    else:
        return email


def validate_value_is_False(response):

    if response:
        raise ValidationError(
            _("You must be at least 18 years old to use this service")
        )
    else:
        return response 