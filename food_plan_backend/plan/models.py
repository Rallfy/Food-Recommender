import secrets
from django.db import models

class UserData(models.Model):
    token = models.CharField(max_length=64, unique=True, default=secrets.token_hex(32))  # 64-character token
    goal = models.CharField(max_length=50)
    exercise = models.CharField(max_length=50)
    age = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()
    bmi = models.FloatField()
    bmi_category = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token: {self.token}, Goal: {self.goal}, Age: {self.age}"
