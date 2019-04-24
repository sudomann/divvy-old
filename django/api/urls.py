from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]