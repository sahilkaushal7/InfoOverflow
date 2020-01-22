from rest_framework import fields, serializers
from . import models


class QuestionSerializer(serializers.ModelSerializer):
    tags = serializers.CharField(source='get_tags_display')

    class Meta:
            model = models.Question
            fields = ('__all__')
            fitler_field = 'user'
