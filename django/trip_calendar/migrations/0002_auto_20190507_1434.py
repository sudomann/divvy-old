# Generated by Django 2.2 on 2019-05-07 14:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comment_thread', '0002_comment_author'),
        ('vehicle_management', '0001_initial'),
        ('zone_management', '0001_initial'),
        ('trip_calendar', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='journey',
            name='comments',
            field=models.ManyToManyField(to='comment_thread.Comment'),
        ),
        migrations.AddField(
            model_name='journey',
            name='destination',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='zone_management.Zone'),
        ),
        migrations.AddField(
            model_name='journey',
            name='driver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='journey',
            name='passengers',
            field=models.ManyToManyField(related_name='trip_calendar_journey_related', through='trip_calendar.Passenger', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='journey',
            name='vehicle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vehicle_management.Vehicle'),
        ),
    ]
