import pandas as pd
import os
import numpy as np

# Define the base directory where the CSV file is expected
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(BASE_DIR, "clustered_recipes.csv")

# Check if the file exists
if not os.path.exists(csv_file_path):
    raise FileNotFoundError(f"The file {csv_file_path} does not exist.")

# Load the clustered dataset
data = pd.read_csv(csv_file_path)

# Parse `steps` field into a list if it's a string
if "steps" in data.columns:
    data["steps"] = data["steps"].apply(lambda x: eval(x) if isinstance(x, str) else x)

# Goal to Cluster Mapping
goal_cluster_mapping = {
    "weight_loss": [0, 3],
    "weight_maintenance": [0, 3, 4],
    "muscle_gain": [3, 4, 1],
    "cheat_day": [1, 2, 4]
}

def calculate_calories(goal, weight, height, age, gender, activity_level):
    """
    Calculate daily calorie needs based on user details and goal.
    """
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    activity_multiplier = {
        "sedentary": 1.2,
        "lightly_active": 1.375,
        "moderate": 1.55,
        "very_active": 1.725,
        "super_active": 1.9,
    }

    calories = bmr * activity_multiplier[activity_level]

    # Adjust calories based on the goal
    if goal == "weight_loss":
        calories -= 300
    elif goal == "muscle_gain":
        calories += 300

    # Add slight variability for realism
    calories += np.random.randint(-30, 30)
    return int(calories)

def recommend_meals(user_calories, dietary_preference, allergies, num_meals=3, goal="weight_maintenance", max_minutes=30):
    """
    Recommend meals based on user preferences and constraints.
    """
    # Get relevant clusters based on the goal
    clusters = goal_cluster_mapping.get(goal, [0, 3, 4])
    filtered_data = data[data["Cluster"].isin(clusters)].copy()

    # Ensure columns are strings for filtering
    filtered_data["ingredients"] = filtered_data["ingredients"].astype(str)
    filtered_data["tags"] = filtered_data["tags"].astype(str)
    filtered_data["steps"] = filtered_data["steps"].apply(lambda x: eval(x) if isinstance(x, str) else x)

    # Filter recipes by dietary preference
    if dietary_preference != "no_preference":
        filtered_data = filtered_data[filtered_data["tags"].str.contains(dietary_preference, case=False, na=False)]

    # Remove recipes containing allergens
    for allergy in allergies:
        filtered_data = filtered_data[~filtered_data["ingredients"].str.contains(allergy, case=False, na=False)]

    # Shuffle the data for random selection
    filtered_data = filtered_data.sample(frac=1, random_state=None).reset_index(drop=True)

    # Define tolerances
    calories_per_meal = user_calories / num_meals
    calorie_tolerances = [1.0, 1.1, 1.2, 1.3, 1.5]
    time_tolerances = [1.0, 1.1, 1.2, 1.3, 1.5]

    selected_recipes = []
    total_calories = 0

    # Search for suitable recipes within tolerances
    for cal_tol in calorie_tolerances:
        for time_tol in time_tolerances:
            current_selected = []
            current_total = 0

            # Process each cluster individually
            for cluster in clusters:
                cluster_recipes = filtered_data[filtered_data["Cluster"] == cluster].copy()
                cluster_recipes["calorie_diff"] = (cluster_recipes["calories"] - calories_per_meal).abs()
                cluster_recipes["time_diff"] = (cluster_recipes["minutes"] - max_minutes).abs()
                cluster_recipes = cluster_recipes.sort_values(["calorie_diff", "time_diff"])

                # Select recipes
                for _, recipe in cluster_recipes.iterrows():
                    if (recipe["calories"] <= calories_per_meal * cal_tol and
                        current_total + recipe["calories"] <= user_calories and
                        recipe["minutes"] <= max_minutes * time_tol):
                        
                        current_selected.append(recipe)
                        current_total += recipe["calories"]

                    if len(current_selected) == num_meals:
                        break
                if len(current_selected) == num_meals:
                    break

            # If recipes are found, exit the loops
            if len(current_selected) == num_meals:
                selected_recipes = current_selected
                total_calories = current_total
                # Ensure `steps` is included and converted correctly
                for recipe in selected_recipes:
                    if isinstance(recipe["steps"], str):
                        try:
                            recipe["steps"] = eval(recipe["steps"])
                        except (SyntaxError, ValueError):
                            recipe["steps"] = ["Invalid steps data"]
                    if not recipe["steps"] or not isinstance(recipe["steps"], list):
                        recipe["steps"] = ["No steps provided"]
                return pd.DataFrame(selected_recipes).to_dict(orient="records")

    # Return an empty list if no recipes are found
    return []
