from django.urls import include, path
from . import views


urlpatterns = [
    path('activate/<str:uid>/<str:token>',  views.ActivationView.as_view(), name='activate')
]