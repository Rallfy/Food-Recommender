from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserData
import secrets  # Import secrets to generate tokens

@csrf_exempt
def save_user_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        # Generate a unique token
        user_token = secrets.token_hex(32)
        
        # Create a new UserData object and save it to the database
        new_user_data = UserData(
            token=user_token,
            goal=data['goal'],
            exercise=data['exercise'],
            age=data['age'],
            weight=data['weight'],
            height=data['height'],
            bmi=data['bmi'],
            bmi_category=data['bmiCategory'],
        )
        new_user_data.save()
        
        # Return the token as part of the response
        return JsonResponse({'message': 'User data saved successfully!', 'token': user_token})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def get_user_data(request, token):
    try:
        user_data = UserData.objects.get(token=token)
        data = {
            'goal': user_data.goal,
            'exercise': user_data.exercise,
            'age': user_data.age,
            'weight': user_data.weight,
            'height': user_data.height,
            'bmi': user_data.bmi,
            'bmi_category': user_data.bmi_category,
        }
        return JsonResponse(data)
    except UserData.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)