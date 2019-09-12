# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-27 02:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartegories',
            name='cartegory_logo',
            field=models.FileField(upload_to=b''),
        ),
        migrations.AlterField(
            model_name='option',
            name='cart',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='option',
            name='favorite',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='products',
            name='product_picture',
            field=models.FileField(upload_to=b''),
        ),
    ]
