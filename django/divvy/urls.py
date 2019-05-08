from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('', include('core.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('account/', include('users.urls')),
]



