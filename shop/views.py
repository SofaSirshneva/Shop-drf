from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .cart import Cart

class MainPage(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        return Response(ProductSerializer(queryset, many=True).data)
    
class AllCategories(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        return Response(CategorySerializer(queryset, many=True).data)
    
class OneProduct(APIView):
    def get(self, request, id):
        queryset = Product.objects.get(id=id)
        return Response(ProductSerializer(queryset, many=False).data)
    
class OneCategory(APIView):
    def get(self, request, name):
        catid = Category.objects.get(name=name)
        queryset = Product.objects.filter(categories=catid)
        return Response(ProductSerializer(queryset, many=True).data)
    
class CartAPI(APIView):
    def get(self, request):
        cart = Cart(request)
        queryset = []
        for product, quantity in cart.cart.items():
            queryset.append(ProductSerializer(Product.objects.get(id=int(product))).data | quantity)
        return Response(queryset)
    
class CartAdd(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.add(request.data['id'])
        print(cart.cart)
        return Response(cart.cart)
    
class CartRemove(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.remove(request.data['id'])
        return Response(cart.cart)
    
class CartDelete(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.delete(request.data['id'])
        return Response(cart.cart)