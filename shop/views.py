from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .cart import Cart
import stripe
import status

class MainPage(APIView):
    def get(self, request):
        cart = Cart(request)
        queryset = ProductSerializer(Product.objects.all(), many=True).data
        for product in queryset:
            if str(product['id']) in cart.cart:
                product['quantity'] = cart.cart[str(product['id'])]['quantity']
            else:
                product['quantity'] = 0
        return Response(queryset)
    
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
        cart = Cart(request)
        catid = Category.objects.get(name=name)
        queryset = ProductSerializer(Product.objects.filter(categories=catid), many=True).data
        for product in queryset:
            if str(product['id']) in cart.cart:
                product['quantity'] = cart.cart[str(product['id'])]['quantity']
            else:
                product['quantity'] = 0
        return Response(queryset)
    
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
        price = Product.objects.get(id=int(request.data['id'])).price
        return Response(cart.cart[str(request.data['id'])] | {'price': price})
    
class CartRemove(APIView):
    def post(self, request):
        cart = Cart(request)
        price = Product.objects.get(id=int(request.data['id'])).price
        cart.remove(request.data['id'])
        if str(request.data['id']) in cart.cart:
            return Response(cart.cart[str(request.data['id'])] | {'price': price})
        else:
            return Response({'quantity': 0} | {'price': price})
    
class CartDelete(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.delete(request.data['id'])
        return Response(cart.cart)
    
stripe.api_key = 'sk_test_51Nh72ZAfQm8BjnDHN7vREfFZZJXaD9CBWD6MP1dUuxODrAaLBDltisg27zTDLmy8S0n3To5NJ02xKf09IYYCY2ZM00aj9V0biO'

class Payment(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        payment_method_id = data['payment_method_id']
        
        # creating customer
        customer = stripe.Customer.create(
        email = email, payment_method=payment_method_id)
        
        return Response(data = {
            'message': 'Success', 
            'data': {'customer_id': customer.id}   
        })
