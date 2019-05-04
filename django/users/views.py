from django.contrib.auth import get_user_model
from django.views.generic.base import TemplateView
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from djoser.views import ActivationView as DjoserActivationView

User = get_user_model()

class ActivationView(TemplateView):

    template_name = "activation.html"

    def dispatch(self, request, *args, **kwargs):
        activate_attempt = DjoserActivationView()
        super().dispatch(request, activate_attempt.status_code)
        