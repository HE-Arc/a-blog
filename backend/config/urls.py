from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import logout
from django.urls import include
from django.urls import path

from apps.auth import urls as auth_urls
from config import settings
from config.api import api


urlpatterns = [
    path('logout/', logout, {'next_page': '/'}, name='logout'),
    path('admin/', admin.site.urls),
    path('api/', include(api.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/', include(auth_urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
