from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from . import serializers
from . import models
from . import permissions


class AnswerViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.Answer.objects.all()
    permission_classes = (
        permissions.UpdateAnswer,
    )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__id',)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.GetAnswerSerializer
        if self.request.method == 'POST':
            return serializers.AnswerSerializer
        return serializers.AnswerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
