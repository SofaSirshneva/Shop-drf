from django.contrib import admin
from django.urls import path
from shop.views import MainPage, AllCategories, OneProduct, OneCategory
from django.conf.urls.static import static
from shop_drf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MainPage.as_view()),
    path('categories', AllCategories.as_view()),
    path('<int:id>', OneProduct().as_view()),
    path('<str:name>', OneCategory().as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
