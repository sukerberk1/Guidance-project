"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from users.views import user_viewset, post_viewset
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = routers.DefaultRouter()
router.register(r'users', user_viewset, basename='user_api')
router.register(r'posts', post_viewset, basename='post_api')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls) ),
    path('api/obtain-pair/', TokenObtainPairView.as_view() , name='obtain-token'),
    path('api/obtain-refresh/', TokenRefreshView.as_view() , name='api-token-auth'),
]
