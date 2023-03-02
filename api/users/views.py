from rest_framework import viewsets
from .serializers import UserSerializer, PostSerializer
from users.models import User
from community.models import Post, Tag, Comment, AttachmentItem
from rest_framework.permissions import IsAuthenticated
 
 
class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


class post_viewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)