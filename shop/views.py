from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .cart import Cart
import stripe

class MainPage(APIView):
    def get(self, request):
        cart = Cart(request)
        queryset = ProductSerializer(Product.objects.all().order_by('-amount'), many=True).data
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
        queryset = ProductSerializer(Product.objects.filter(categories=catid).order_by('-amount'), many=True).data
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
        return Response(cart.cart[str(request.data['id'])])
    
class CartRemove(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.remove(request.data['id'])
        if str(request.data['id']) in cart.cart:
            return Response(cart.cart[str(request.data['id'])])
        else:
            return Response({'quantity': 0})
    
class CartDelete(APIView):
    def post(self, request):
        cart = Cart(request)
        cart.delete(request.data['id'])
        return Response(cart.cart)
    
class CartClean(APIView):
    def patch(self, request):
        cart = Cart(request)
        for el, amount in list(cart.cart.items()):
            prod = Product.objects.get(id=el)
            prod.amount -= amount['quantity']
            prod.save()
            cart.delete(el)
        return Response('Success')
    
class Search(APIView):
    def get(self, request):
        queryset = ProductSerializer(Product.objects.filter(name__icontains=request.GET["key"]), many=True).data
        cart = Cart(request)
        for product in queryset:
            if str(product['id']) in cart.cart:
                product['quantity'] = cart.cart[str(product['id'])]['quantity']
            else:
                product['quantity'] = 0
        return Response(queryset)
    
stripe.api_key = 'sk_test_51Nh72ZAfQm8BjnDHN7vREfFZZJXaD9CBWD6MP1dUuxODrAaLBDltisg27zTDLmy8S0n3To5NJ02xKf09IYYCY2ZM00aj9V0biO'

class Payment(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        payment_method_id = data['payment_method_id']
        
        # creating customer
        customer = stripe.Customer.create(
        email = email, payment_method=payment_method_id)
        stripe.PaymentIntent.create(
            customer=customer, 
            payment_method=payment_method_id,  
            currency='pln',
            amount=data['price'],
            confirm=True,
            return_url='http://127.0.0.1:3000/'
        )
        
        return Response(data = {
            'message': 'Success', 
            'data': {'customer_id': customer.id}   
        })
