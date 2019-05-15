from rest_framework import serializers
from contact_management.models import Contact


class ContactSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Contact
        
        fields = ('uuid',
                  'first_name',
                  'last_name',
                  'email',
                  'phone',)
        
        read_only_fields = ('uuid',)
