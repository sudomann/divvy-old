from django.urls import include, path

from . import views


urlpatterns = [
    path('', views.AllJourneyView.as_view()),
    path('<int:journey_id>', views.JourneyView.as_view()),
]