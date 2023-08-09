from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response

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