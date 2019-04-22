# Generated by Django 2.2 on 2019-04-22 18:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trip_calendar', '0006_auto_20190422_0303'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracker',
            name='source',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
