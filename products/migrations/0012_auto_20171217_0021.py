# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-17 00:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_auto_20171217_0007'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='adress',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='product_sold',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='product_sold',
            name='transaction',
        ),
        migrations.RemoveField(
            model_name='product_sold_stranger',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='product_sold_stranger',
            name='transaction',
        ),
        migrations.DeleteModel(
            name='Town',
        ),
        migrations.RemoveField(
            model_name='transaction',
            name='customer',
        ),
        migrations.DeleteModel(
            name='Adress',
        ),
        migrations.DeleteModel(
            name='Product_sold',
        ),
        migrations.DeleteModel(
            name='Product_sold_stranger',
        ),
        migrations.DeleteModel(
            name='Transaction',
        ),
        migrations.DeleteModel(
            name='Transaction_stranger',
        ),
    ]
