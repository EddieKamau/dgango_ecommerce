from django.http import HttpResponse
from .models import Products, Cartegories
from django.template import loader



def index(request):

	all_categories = Cartegories.objects.all()
	all_products = Products.objects.all()
	template = loader.get_template('products/index.html')
	context ={
		'all_categories':all_categories,
		'all_products':all_products,
		}
	return HttpResponse(template.render(context, request))



def products(request, cartegory_id):
	all_products = Products.objects.filter(cartegory=cartegory_id)
	cartegory = Cartegories.objects.get(id=cartegory_id)
	template = loader.get_template('products/products.html')
	context = {
		'all_products': all_products,
		'cartegory': cartegory
		}
	return HttpResponse(template.render(context, request))


def details(request, cartegory_id, products_id):
	template = loader.get_template('products/details.html')
	product_details = Products.objects.get(id=products_id)
	related_products = Products.objects.filter(cartegory=cartegory_id)
	context = {
		'product_details': product_details,
		'related_products': related_products
		}
	return HttpResponse(template.render(context, request))

def cart(request):
	template = loader.get_template('products/cart.html')
	return HttpResponse(template.render({}, request))


