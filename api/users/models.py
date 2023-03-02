from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    score = models.IntegerField(default=0)
    avatar = models.ImageField(blank=True)
    followed_users = models.ManyToManyField("self", symmetrical=False, related_name="followed_by", blank=True)
    bio = models.TextField(default="", blank=True)

    def __str__(self) -> str:
        return super().username

    # returns how many users is User followed by
    def followed_by_count(self) -> int:
        return self.followed_by.count()

    # returns how many users does User follow
    def following_count(self) -> int:
        return self.followed_users.count()

    # returns queryset of users followed by User
    def get_followed_users(self):
        return self.followed_users.all()
    
    # returns posts created by User
    def get_posts(self):
        return self.posts.all()
