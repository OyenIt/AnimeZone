# Generated by Django 4.1.5 on 2023-03-03 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_azitemanime_update_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='azsubitemanime',
            name='episode',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]