from rest_framework import serializers
from users.models import User
from community.models import Post, Comment, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", "is_staff", "is_superuser")
        
        write_only_fields = ('password',)
        read_only_fields = ('id',)
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        return super().create(validated_data)

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = "__all__"