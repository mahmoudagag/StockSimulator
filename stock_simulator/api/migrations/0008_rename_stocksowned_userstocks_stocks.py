# Generated by Django 3.2.3 on 2021-06-10 23:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210609_1922'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userstocks',
            old_name='StocksOwned',
            new_name='Stocks',
        ),
    ]
