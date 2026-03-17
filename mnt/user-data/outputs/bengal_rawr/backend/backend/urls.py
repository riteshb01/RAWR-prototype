"""
Bengal RAWR — Main URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.syllabus.urls')),
    path('api/v1/', include('apps.events.urls')),
    path('api/v1/', include('apps.conflict_engine.urls')),
    path('api/v1/', include('apps.dashboard.urls')),
    path('api/v1/', include('apps.users.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
