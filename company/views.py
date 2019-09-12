from .models import *
from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.template import loader



class Indexview(generic.ListView):
	template_name = 'company/index.html'

	def get_queryset(self):
		return Cartegories.objects.all()


class CategoryView(generic.DetailView):
	model = Cartegories
	template_name = 'company/category.html'




def productview(request,cartegory_id, product_id):
	template = loader.get_template('company/products.html')
	product_details = Products.objects.get(id=product_id)
	products = Products.objects.filter(cartegory=cartegory_id)
	context = {
		'product_details': product_details,
		'products': products
		}
	return HttpResponse(template.render(context, request))

class ProductsCreate(CreateView):
	model = Products
	fields = ['cartegory', 'product_name', 'product_logo', 'product_field', 'product_details', 'product_cost']
	template_name = 'company/products_form.html'

class ProductUpdate(UpdateView):
	model = Products
	fields = ['cartegory', 'product_name', 'product_logo', 'product_field', 'product_details', 'product_cost']
	template_name = 'company/products_form.html'

class ProductsDelete(DeleteView):
	model = Products
	success_url = reverse_lazy('company:index')

class CartegoriesCreate(CreateView):
	model = Cartegories
	fields = ['cartegory_name', 'cartegory_logo']
	template_name = 'company/products_form.html'









