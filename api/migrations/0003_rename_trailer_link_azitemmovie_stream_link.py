# Generated by Django 4.1.5 on 2023-02-17 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_azitemanime_category_azitemmovie_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='azitemmovie',
            old_name='trailer_link',
            new_name='stream_link',
        ),
    ]