# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-27 15:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20171127_1517'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='cart',
        ),
        migrations.RemoveField(
            model_name='products',
            name='favorite',
        ),
        migrations.RemoveField(
            model_name='products',
            name='product_cost',
        ),
        migrations.RemoveField(
            model_name='products',
            name='product_description',
        ),
    ]
