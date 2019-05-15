from django.urls import path

from .views import VehicleListorCreate, VehicleReadWriteDelete

urlpatterns = [
    path('', VehicleListorCreate.as_view(), name='list-vehicles'),
    path('<str:uuid>', VehicleReadWriteDelete.as_view(), name='read-write-delete-vehicle'),
]