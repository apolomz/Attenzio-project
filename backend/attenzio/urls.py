from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('apps.usuarios.urls')),
    path('api/cursos/', include('apps.cursos.urls')),
    path('api/sesiones/', include('apps.sesiones.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)