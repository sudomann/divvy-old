# Generated by Django 2.2 on 2019-05-07 14:34

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('zone_management', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Domain',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostname', models.CharField(max_length=30, unique=True, validators=[django.core.validators.RegexValidator(message='Invalid hostname', regex='^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9])$')])),
                ('details', models.CharField(max_length=100)),
                ('available_zones', models.ManyToManyField(blank=True, to='zone_management.Zone')),
            ],
        ),
    ]
