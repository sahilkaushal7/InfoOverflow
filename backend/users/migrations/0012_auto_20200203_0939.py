# Generated by Django 3.0.1 on 2020-02-03 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_auto_20200122_0643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='status_text',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
