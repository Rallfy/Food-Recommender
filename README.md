# Food Recommender App

This is a full-stack application built with Django (backend) and React (frontend) to help users get personalized food plans based on their health conditions and goals.

## Requirements

- **Python** (3.8+)
- **Node.js** (14+)
- **Django** (5.x)
- **React** (18.x)
- **Git** for cloning the repository

## Setup Instructions

### Backend (Django)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Food_Recommender_App.git
   cd Food_Recommender_App/food_plan_backend
2.  **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserve
   ```
The backend server will run at: **http://127.0.0.1:8000/**

3. **Frontend (React)**

   ```bash
   cd ../food-plan-app
   npm install
   npm start
   ```
