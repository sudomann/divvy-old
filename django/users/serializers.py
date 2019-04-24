from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User = get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'password',
                  'first_name',
                  'last_name',
                  'phone',
                  'is_minor',
                  'gender')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        '''
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data['phone'],
            is_minor=validated_data['is_minor'],
            gender=validated_data['is_minor']
        )
        '''
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserRegisterSerializer(serializers.ModelSerializer):
    model = User
    fields = ('id',
              'email',
              'password',
              'first_name',
              'last_name',
              'phone',
              'is_minor',
              'gender')

    def save(self, request):
        user = User.objects.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    model = User
    fields = ('email', 'password')
