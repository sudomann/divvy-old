# Generated by Django 2.2 on 2019-05-08 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment_thread', '0002_comment_author'),
        ('trip_calendar', '0006_request_picked_up_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='comments',
            field=models.ManyToManyField(to='comment_thread.Comment'),
        ),
    ]
