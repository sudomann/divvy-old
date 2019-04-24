from django.core.exceptions import ValidationError
from domain_management.models import Domain
from django.utils.translation import ugettext_lazy as _


def is_hostname_supported(email):
    # TODO: Check that the email passed here is normalized!
    email_hostname = email.partition('@')[2]

    if not Domain.objects.filter(hostname=email_hostname).exists():
        raise ValidationError(
            _("\"{}\". Your school is not supported on this service.".format(
                email_hostname))
        )
    else:
        return email
