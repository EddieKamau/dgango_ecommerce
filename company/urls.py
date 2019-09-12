from django.conf.urls import url
from . import views

app_name = 'company'

urlpatterns = [
    url(r'^$', views.Indexview.as_view(), name='index'),
    url(r'^(?P<pk>[0-9]+)/$', views.CategoryView.as_view(), name='category'),
    url(r'^(?P<cartegory_id>[0-9]+)/(?P<product_id>[0-9]+)/$', views.productview, name='products'),

    url(r'^add/category/$', views.CartegoriesCreate.as_view(), name='category-add'),
    # /category_id/add/
    url(r'^add/product/$', views.ProductsCreate.as_view(), name='productadd'),
    # /category_id/product_id/edit
    url(r'^(?P<cartegory_id>[0-9]+)/(?P<pk>[0-9]+)/edit/$', views.ProductUpdate.as_view(), name='productupdate'),
    # /category_id/product_id/delete/
    url(r'^(?P<cartegory_id>[0-9]+)/(?P<pk>[0-9]+)/delete/$', views.ProductsDelete.as_view(), name='productdelete'),

        ]