from django.contrib import admin
from django.urls import path
from shop.views import MainPage, AllCategories, OneProduct, OneCategory, \
                       CartAPI, CartAdd, CartRemove, CartDelete, Payment, CartClean
from django.conf.urls.static import static
from shop_drf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MainPage.as_view()),
    path('categories', AllCategories.as_view()),
    path('<int:id>', OneProduct().as_view()),
    path('category/<str:name>', OneCategory().as_view()),
    path('cart/', CartAPI().as_view()),
    path('cart_add/', CartAdd().as_view()),
    path('cart_remove/', CartRemove().as_view()),
    path('cart_delete/', CartDelete().as_view()),
    path('cart_clean/', CartClean().as_view()),
    path('payment/', Payment().as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
