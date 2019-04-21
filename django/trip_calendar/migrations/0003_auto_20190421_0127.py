# Generated by Django 2.2 on 2019-04-21 01:27

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trip_calendar', '0002_auto_20190417_1557'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_plate', models.CharField(max_length=8, validators=[django.core.validators.MinLengthValidator(5)])),
                ('added_time', models.DateTimeField(auto_now_add=True)),
                ('is_roadsafe', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_known_location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('journey', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='trip_calendar.Journey')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=100)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('journey', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='trip_calendar.Journey')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='journey',
            name='vehicle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='trip_calendar.Vehicle'),
        ),
    ]
