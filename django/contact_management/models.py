from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()

class Contact(models.Model):
    added_by = models.ForeignKey(User, null=True, on_delete=models.PROTECT)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(_('email address'), unique=True)
    phone = PhoneNumberField()
    is_minor = models.BooleanField(default=True)

    def __str__(self):
            return '%s %s, %s' % (self.first_name, self.last_name, self.email)
