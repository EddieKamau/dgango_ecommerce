from django.db import models
from django.urls import reverse


class Cartegories(models.Model):
    cartegory_name = models.CharField(max_length=150)
    cartegory_logo = models.FileField()

    def get_absolute_url(self):
        # return reverse('company:index')
        return reverse('company:category', kwargs={'pk': self.pk})

    def __str__(self):
        return self.cartegory_name


class Products(models.Model):
    cartegory = models.ForeignKey(Cartegories, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=250)
    product_logo = models.FileField()
    product_field = models.CharField(max_length=150)
    product_details = models.CharField(max_length=750)
    product_cost = models.CharField(max_length=20)
    favorite = models.BooleanField(default=False)
    cart = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('company:index')

    # return reverse('company:category', kwargs={'pk': Cartegories.pk})

    def __str__(self):
        return self.product_name


class Customer(models.Model):
    customer_first_name = models.CharField(max_length=20)
    customer_last_name = models.CharField(max_length=20)
    customer_password = models.CharField(max_length=20)

    def __str__(self):
        return self.customer_last_name


class Town(models.Model):
    county = models.CharField(max_length=50)
    town = models.CharField(max_length=50)

    def __str__(self):
        return self.town


class Adress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    phone_number = models.IntegerField()
    town = models.ForeignKey(Town, on_delete=models.CASCADE)


class Transaction(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # transaction_id = models.IntegerField(primary_key=True)
    transaction_date = models.DateTimeField()


class Transaction_stranger(models.Model):
    # transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction_date = models.DateTimeField()


class Product_sold(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)

    def __index__(self):
        return self._get_pk_val


class Product_sold_stranger(models.Model):
    transaction = models.ForeignKey(Transaction_stranger, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)
    stranger_first_name = models.CharField(max_length=50)
    stranger_last_name = models.CharField(max_length=50)
    stranger_phone_number = models.IntegerField()
