from django.contrib import admin

#from django.contrib import admin
from products.models import Cartegories, Products, Customer, Adress, Town, Transaction, Transaction_stranger, Product_sold, Product_sold_stranger


admin.site.register(Cartegories)
admin.site.register(Products)
admin.site.register(Customer)
admin.site.register(Adress)
admin.site.register(Town)
admin.site.register(Transaction)
admin.site.register(Transaction_stranger)
admin.site.register(Product_sold)
admin.site.register(Product_sold_stranger)