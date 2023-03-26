from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, generics
from .serializers import ShortUserSerializer, UserSerializer
from users.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_simplejwt.authentication import JWTAuthentication
 

class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(methods=["get"], detail=False, url_path=r'username/(?P<username>\w+)')
    def by_username(self, request, username=None):
        # user = get_object_or_404(User, username=username)
        user = User.objects.get(username=username)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(methods=["PUT"], detail=False, url_path="follow", permission_classes=(IsAuthenticated,))
    def follow(self, request, *args, **kwargs):
        auth = JWTAuthentication()
        user, token = auth.authenticate(self.request)
        user_under_action = get_object_or_404(User, username=request.data['username'])
        if user == user_under_action:
            return Response(status=status.HTTP_204_NO_CONTENT)
        if user.followed_users.contains(user_under_action):
            user.followed_users.remove(user_under_action)
        else:
            user.followed_users.add(user_under_action)
        serializer = self.serializer_class(user_under_action)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = []
        elif self.action == 'follow':
            permission_classes = (IsAuthenticated,)
        elif self.action == 'update' or self.action == 'parital_update' or self.action == 'destroy':
            permission_classes = (IsAdminUser,)
        else:
            # permission_classes = (IsAuthenticated,)    # <--- is it good to make user profiles only visible to authenticated users (?)
            permission_classes = []
        return [permission() for permission in permission_classes]




@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def get_user_by_token(request):
    auth = JWTAuthentication()
    user, token = auth.authenticate(request)
    return Response(ShortUserSerializer(user).data)