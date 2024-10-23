from django.contrib import admin
from django.urls import path
from plan.views import save_user_data, get_user_data


urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/save-user-data/', save_user_data, name='save_user_data'),
    path('api/get-user-data/<str:token>/', get_user_data, name='get_user_data'),
]
