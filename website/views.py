from django.http import HttpResponse


def homepage(request):
	return HttpResponse("<h1> This is the main or general homepage </h1><a href='/products/'>Products</a><br><a href='/company/'>Company</a>")