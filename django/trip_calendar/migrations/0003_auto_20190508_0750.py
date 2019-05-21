# Generated by Django 2.2 on 2019-05-08 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip_calendar', '0002_auto_20190507_1434'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='picked_up',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='vehicle_plate_confirmed',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
