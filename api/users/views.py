
from rest_framework import viewsets
from .serializers import UserSerializer
from django.contrib.auth.models import User
 
 
class userviewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer