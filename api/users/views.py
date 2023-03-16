from rest_framework import viewsets
from .serializers import UserSerializer, ShortUserSerializer
from users.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
 
 
class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = []
        elif self.action == 'update' or self.action == 'parital_update':
            permission_classes = (IsAdminUser,)
        else:
            permission_classes = (IsAuthenticated,)
        return [permission() for permission in permission_classes]


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def get_user_by_token(request):
    auth = JWTAuthentication()
    user, token = auth.authenticate(request)
    return Response(ShortUserSerializer(user).data)