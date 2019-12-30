from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from users import permissions
from . import serializers
from . import models
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
  serializer_class = serializers.UserSerializer
  queryset = models.User.objects.all()
  authentication_classes = (TokenAuthentication,)
  permission_classes = (permissions.UpdateOwnProfile,)
  filter_backends = (filters.SearchFilter,)
  search_fields = ('name', 'email',)


class UserLoginApiView(ObtainAuthToken):
  def post(self, request, *args, **kwargs):
        response = super(UserLoginApiView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({
          'token': token.key, 
          'id': token.user_id, 
          'username': user.name, 
          'email': user.email
          })


class UserProfileViewSet(viewsets.ModelViewSet):
  authentication_classes = (TokenAuthentication,)
  serializer_class = serializers.UserProfileSerializer
  queryset = models.UserProfile.objects.all()
  permission_classes = (
    permissions.UpdateOwnUserProfile,
    IsAuthenticated,
  )
  filter_backends = (filters.SearchFilter,)
  search_fields = ('user__id',)
  lookup_field = 'user'

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)