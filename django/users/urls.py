from django.urls import include, path

from .views import UserRegisterView

urlpatterns = [
    path('register/', UserRegisterView)
]