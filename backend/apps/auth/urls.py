from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import RoleTokenObtainPairView

urlpatterns = [
    path('token/', RoleTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
