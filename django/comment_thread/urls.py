from django.urls import path

from .views import CommentListorCreate, CommentReadWriteDelete

urlpatterns = [
    path('', CommentListorCreate.as_view(), name='list-comments'),
    path('<str:uuid>', CommentReadWriteDelete.as_view(), name='read-write-delete-comment'),
]