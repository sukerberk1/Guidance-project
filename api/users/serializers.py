from rest_framework import serializers
from users.models import User

class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username","first_name","last_name","avatar")

class UserSerializer(serializers.ModelSerializer):
    followed_users = ShortUserSerializer(many=True)
    class Meta:
        model = User
        exclude = ("is_staff", "is_superuser", "is_active", "user_permissions")
        extra_kwargs = {'password': {'write_only': True}}
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
        return user

