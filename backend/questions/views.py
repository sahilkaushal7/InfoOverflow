from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from questions import permissions
from . import serializers
from . import models

# Create your views here.


class QuestionViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.QuestionSerializer
    queryset = models.Question.objects.all()
    permission_classes = (
        permissions.UpdateOwnQuestion,
    )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__id',)
    lookup_field = 'user'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
