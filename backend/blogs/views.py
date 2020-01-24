from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from . import serializers
from . import models
from . import permissions


class BlogViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.Blog.objects.all()
    permission_classes = (
        permissions.UpdateBlog,
    )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__id',)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.GetBlogSerializer
        if self.request.method == 'POST':
            return serializers.BlogSerializer
        return serializers.BlogSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
