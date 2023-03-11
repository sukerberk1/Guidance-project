from rest_framework import viewsets
from .serializers import UserSerializer
from users.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
 
 
class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer