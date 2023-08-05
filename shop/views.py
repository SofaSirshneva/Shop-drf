from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class MainPage(APIView):
    def get(self, request):
        queryset = Product.objects.all().values()
        serializer_class = ProductSerializer
        return Response(queryset)