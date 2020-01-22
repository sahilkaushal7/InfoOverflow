from rest_framework import serializers
from . import models
from core.apis.serializers import UserFieldModelSerializer

class BlogSerializer(UserFieldModelSerializer):

    class Meta:
        model = models.Blog
        fields = ['user', 'title', 'description', 'id', 'image']
