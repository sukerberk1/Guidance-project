from rest_framework import serializers
from users.serializers import ShortUserSerializer
from .models import Post, Comment

#TODO: response caching?
class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField(source="get_likes_count")
    likes = ShortUserSerializer(many=True)
    author = ShortUserSerializer()
    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"