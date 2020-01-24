from rest_framework import serializers
from . import models
from core.apis.serializers import UserFieldModelSerializer


class GetBlogSerializer(UserFieldModelSerializer):

    class Meta:
        model = models.Blog
        fields = ['user', 'title', 'description', 'id', 'image']


class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Blog
        fields = ['user', 'title', 'description', 'id', 'image']
