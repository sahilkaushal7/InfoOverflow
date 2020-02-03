from rest_framework import serializers
from . import models
from core.apis.serializers import UserFieldModelSerializer


class GetAnswerSerializer(UserFieldModelSerializer):

    class Meta:
        model = models.Answer
        fields = ['user', 'answer', 'question', 'id']


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Answer
        fields = ['user', 'answer', 'question', 'id']
