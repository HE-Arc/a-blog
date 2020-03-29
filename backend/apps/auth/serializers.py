from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.conf import settings

from apps.users.serializers import UserSerializer


class RoleTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['role'] = self.user.get_role()
        data['expiration'] = int(settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME').total_seconds())
        data['refresh_expiration'] = int(settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME').total_seconds())
        data['user'] = UserSerializer(self.user).data

        return data
