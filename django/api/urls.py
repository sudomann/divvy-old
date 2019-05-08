from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('users.urls')),
    path('journey/', include('trip_calendar.urls')),
]