from django.db import models
import secrets

class UserData(models.Model):
    token = models.CharField(max_length=64, unique=True, default=secrets.token_hex(32))
    goal = models.CharField(max_length=50)
    exercise = models.CharField(max_length=50)
    age = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()
    gender = models.CharField(max_length=10)
    dietary_preference = models.CharField(max_length=50)
    num_meals = models.IntegerField(default=3)  # Default to 3 meals
    allergies = models.JSONField(default=list)  # Stores as a JSON array
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token: {self.token}, Goal: {self.goal}, Age: {self.age}"
