# Generated by Django 4.1.7 on 2023-03-02 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_post_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='pub_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
