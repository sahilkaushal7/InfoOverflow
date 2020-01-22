from rest_framework import serializers


class UserField(serializers.Field):
    def to_representation(self, value):
        user = {
            'name': value.user.name,
            'email': value.user.email,
            'id': value.user.id,
        }
        return user


class UserFieldModelSerializer(serializers.ModelSerializer):
    user = UserField(source='*')
