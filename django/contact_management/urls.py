from django.urls import path

from .views import ContactListorCreate, ContactReadWriteDelete

urlpatterns = [
    path('', ContactListorCreate.as_view(), name='list-contacts'),
    path('<str:uuid>', ContactReadWriteDelete.as_view(), name='read-write-delete-contact'),
]