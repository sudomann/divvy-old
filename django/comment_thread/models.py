from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    content = models.CharField(max_length=100)
    created_time = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)