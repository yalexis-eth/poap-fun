# Generated by Django 3.0.7 on 2020-07-29 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0022_auto_20200729_1841'),
    ]

    operations = [
        migrations.AddField(
            model_name='raffle',
            name='start_date_helper',
            field=models.TextField(blank=True, null=True, verbose_name='start date helper'),
        ),
    ]