from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.User
    fields = ['name', 'id', 'email', 'password']
    extra_kwargs = {
      'password': {
        'write_only': True,
        'style': {
          'input-type': 'password'
        }
      }
    }
  
  def create(self, validated_data):
    user = models.User.objects.create_user(
      email = validated_data['email'],
      name = validated_data['name'],
      password = validated_data['password'],
    )

    return user
