# Generated by Django 3.0.7 on 2020-08-03 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0023_raffle_start_date_helper'),
    ]

    operations = [
        migrations.AddField(
            model_name='blockdata',
            name='timestamp',
            field=models.BigIntegerField(null=True, verbose_name='timestamp'),
        ),
    ]