from django.db import models
from users.models import User

# Create your models here.


class Notification(models.Model):
    description = models.TextField()
    recievers = models.ManyToManyField(User, related_name="notifications", blank=True)


class Tag(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.name

    def get_tagged_posts(self):
        return self.tagged_posts.all()


class Post(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="tagged_posts", blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    pub_date = models.DateTimeField(auto_now=True)
    users_following = models.ManyToManyField(User, related_name="followed_posts", blank=True)
    
    POST_THEMES = (
        ("P","post"),
        ("Q","question")
    )
    theme = models.CharField(max_length=1, choices=POST_THEMES, default='P')

    def get_tags(self):
        return self.tags.all()

    def get_likes_count(self):
        return self.likes.count()

    def get_likes_users(self):
        return self.likes.all()


class AttachmentItem(models.Model):
    file = models.FileField()
    related_post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now=True)