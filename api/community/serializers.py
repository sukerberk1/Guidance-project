from rest_framework import serializers
from users.serializers import ShortUserSerializer
from users.models import User
from .models import Post, Comment, Tag

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name',)


#TODO: merge those 2 serializers - author needs to be serialized conditionally - only on retrieving
class CreatePostSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField(source="get_likes_count")
    likes = ShortUserSerializer(many=True, required=False)
    class Meta:
        model = Post
        fields = "__all__"


#TODO: response caching?
class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField(source="get_likes_count")
    likes = ShortUserSerializer(many=True, required=False)
    author = ShortUserSerializer()
    class Meta:
        model = Post
        fields = "__all__"
        depth = 1



