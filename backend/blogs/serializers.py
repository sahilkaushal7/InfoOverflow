from rest_framework import serializers
from . import models


class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Blog
        fields = ['user', 'title', 'description', 'id', 'image']
