from rest_framework import serializers
from . import models
from core.apis.serializers import UserFieldModelSerializer


class QuestionSerializer(UserFieldModelSerializer):
    tags = serializers.CharField(source='get_tags_display')

    class Meta:
        model = models.Question
        fields = ['id', 'title', 'description', 'created_on', 'user', 'tags']
        fitler_field = 'user'
