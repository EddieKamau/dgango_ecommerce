from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
    url(r'^(?P<cartegory_id>[0-9]+)/$', views.products, name='products'),
    url(r'^(?P<cartegory_id>[0-9]+)/(?P<products_id>[0-9]+)/$', views.details, name='details'),
    url(r'^cart/$', views.cart, name='cart'),
]
