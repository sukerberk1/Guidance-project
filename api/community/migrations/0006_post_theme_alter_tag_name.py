# Generated by Django 4.1.5 on 2023-03-11 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0005_comment_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='theme',
            field=models.CharField(choices=[('P', 'post'), ('Q', 'question')], default='Q', max_length=1),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
