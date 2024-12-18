from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserData
from .recommender import recommend_meals, calculate_calories
import secrets

@csrf_exempt
def save_user_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Generate token and save user data
            user_token = secrets.token_hex(32)
            new_user_data = UserData(
                token=user_token,
                goal=data['goal'],
                exercise=data['exercise'],
                age=int(data['age']),
                weight=float(data['weight']),
                height=float(data['height']),
                gender=data['gender'],
                dietary_preference=data['dietaryPreference'],
                num_meals=int(data['numMeals']),
                allergies=data.get('allergies', []),
            )
            new_user_data.save()

            # Calculate calories and generate recommendations
            user_calories = calculate_calories(
                data['goal'], float(data['weight']), float(data['height']),
                int(data['age']), data['gender'], data['exercise']
            )
            recommendations = recommend_meals(
                user_calories, data['dietaryPreference'], data.get('allergies', []),
                int(data['numMeals']), data['goal']
            )

            return JsonResponse({
                'message': 'User data saved successfully!',
                'token': user_token,
                'recommendations': recommendations
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)

def get_user_data(request, token):
    try:
        # Fetch user data using the token
        user_data = UserData.objects.get(token=token)
        # Prepare the response data
        data = {
            "goal": user_data.goal,
            "exercise": user_data.exercise,
            "age": user_data.age,
            "weight": user_data.weight,
            "height": user_data.height,
            "gender": user_data.gender,
            "dietary_preference": user_data.dietary_preference,
            "num_meals": user_data.num_meals,
            "allergies": user_data.allergies,
        }
        return JsonResponse(data)
    except UserData.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)