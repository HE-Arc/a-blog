from uuid import uuid4

from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)

from apps.auth.permissions import (
    MixedPermissionModelViewSet
)

from rest_framework.decorators import action

from rest_framework.response import Response

from django.contrib.auth import authenticate, login
from django.conf import settings
from apps.users.models import User
from apps.users.serializers import UserSerializer, UserWriteSerializer



class UserViewSet(MixedPermissionModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes_by_action = {
        'retrieve': [IsAuthenticated, IsAdminUser],
        'list': [IsAuthenticated, IsAdminUser],
        'create': [IsAuthenticated, IsAdminUser],
        'update': [IsAuthenticated],
        'partial_update': [IsAuthenticated],
        'destroy': [IsAuthenticated, IsAdminUser],
        'profile': [IsAuthenticated],
        'login': [AllowAny],
        'register': [IsAuthenticated, IsAdminUser],
        'password_reset': [AllowAny],
        'password_change': [AllowAny],
    }

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserSerializer
        return UserWriteSerializer

    # def perform_create(self, serializer):
    #     user = serializer.save()
    #     user.set_password(self.request.data.get('password'))
    #     user.is_staff = True
    #     user.save()
    #
    # def perform_update(self, serializer):
    #     user = serializer.save()
    #     if 'password' in self.request.data:
    #         user.set_password(self.request.data.get('password'))
    #         user.save()
    #
    # def perform_destroy(self, instance):
    #     # if instance.is_ergo and instance.ergo.is_moderator:
    #     #     # assigns admin to moderator
    #     #     instance.group.moderator = User.objects.filter(
    #     #         is_staff=True).last()
    #     #     instance.group.save()
    #
    #     instance.delete()
    #
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # @action(methods=['GET'], detail=True)
    # def profile(self, request):
    #     print("\n\n")
    #     print("ICI")
    #     print("\n\n")
    #     serializer = self.serializer_class(request.user)
    #
    #     return Response(status=status.HTTP_200_OK, data=serializer.data)
    #
    # def login(self, request, format=None):
    #     print("\n\n")
    #     print("LAAAAA")
    #     print("\n\n")
    #     email = request.data.get('email', None)
    #     password = request.data.get('password', None)
    #     user = authenticate(username=email, password=password)
    #
    #     if user:
    #         login(request, user)
    #         return Response(status=status.HTTP_200_OK)
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    #
    # def register(self, request):
    #     last_name = request.data.get('last_name', None)
    #     first_name = request.data.get('first_name', None)
    #     email = request.data.get('email', None)
    #     password = request.data.get('password', None)
    #
    #     if User.objects.filter(email__iexact=email).exists():
    #         return Response({'status': 210})
    #
    #     user = User.objects.create(
    #         email=email,
    #         password=password,
    #         last_name=last_name,
    #         first_name=first_name,
    #     )
    #
    #     return Response(UserSerializer(user).data,
    #                     status=status.HTTP_201_CREATED)
    #
    # def password_reset(self, request, format=None):
    #     if User.objects.filter(email=request.data['email']).exists():
    #         user = User.objects.get(email=request.data['email'])
    #         domain = "http://localhost:3000" if settings.DEBUG else \
    #             settings.DOMAIN
    #
    #         # params = {'user': user, 'DOMAIN': domain}
    #         # send_email_message(
    #         #     recipients=[request.data['email']],
    #         #     subject='SNASE - Remise à zéro du mot de passe',
    #         #     body=render_to_string('mail/password_reset.txt', params)
    #         # )
    #         return Response(status=status.HTTP_200_OK)
    #     else:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
    # def password_change(self, request, format=None):
    #     if User.objects.filter(token=request.data['token']).exists():
    #         user = User.objects.get(token=request.data['token'])
    #         user.set_password(request.data['password'])
    #         user.token = uuid4()
    #         user.save()
    #         return Response(status=status.HTTP_200_OK)
    #     else:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
