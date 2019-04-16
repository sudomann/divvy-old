from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from . import models


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        
        email = self.normalize_email(email)

        '''
        email_domain = email.partition('@')[2]
        
        
        user = None
        try:
            # lookup might fail when no matches are found
            domain_instance = models.Domain.objects.get(fqdn=email_domain)
            user = self.model(email=email, domain=domain_instance, **extra_fields)
        except models.Domain.DoesNotExist:
            user = self.model(email=email, domain=None, **extra_fields)
        '''
        user = self.model(email=email, **extra_fields)
        user.full_clean()
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
