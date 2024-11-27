from django.contrib import admin
from .models import UserData

admin.site.register(UserData)
class UserDataAdmin(admin.ModelAdmin):
    list_display = ('token', 'goal', 'age', 'weight', 'height', 'gender', 'dietary_preference', 'cooking_time', 'bmi', 'bmi_category', 'created_at')
    search_fields = ('token', 'goal', 'gender', 'dietary_preference')