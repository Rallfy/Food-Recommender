# Food Recommender App

This is a full-stack web application developed as part of a team project during our academic program. The application provides personalized meal recommendations based on each user's health goals, dietary preferences, and lifestyle constraints.

The system integrates a responsive React frontend, a Django backend, and an AI-based recommender engine designed to deliver custom daily meal plans for each user.

## Project Highlights

- End-to-end recommendation pipeline: from data collection to meal generation
- Machine Learning with K-Means clustering to group recipes based on nutritional profiles
- Knapsack-style optimization algorithm to select meals based on calories and time constraints
- Secure API endpoints and tokenized data handling
- Dynamic, mobile-friendly user interface for simple and effective interaction

## Technology Stack

- Django (Backend API)
- React (Frontend)
- Python (ML logic and clustering)
- SQLite (Data storage)
- HTML/CSS/JS (Client-side rendering)

## How to Run the Project

### 1. Backend (Django)

```bash
cd food_plan_backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs on: http://127.0.0.1:8000/

### Frontend (React)

```bash
cd ../
npm install
npm start
```

Runs on: http://localhost:3000/

## License

This project is intended for educational and non-commercial purposes only. For permission to use or extend this work, please contact the author.

