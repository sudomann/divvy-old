# Generated by Django 2.2 on 2019-05-07 14:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('live_tracker', '0001_initial'),
        ('trip_calendar', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracker',
            name='journey',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='trip_calendar.Journey'),
        ),
    ]
