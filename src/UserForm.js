import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './UserForm.css';

function UserForm() {
  const [formData, setFormData] = useState({
    goal: '',
    exercise: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    dietaryPreference: '',
    cookingTime: '',
    allergies: [], // Track selected allergies
    bmi: '',
    bmiCategory: '',
  });

  const predefinedAllergies = ['Dairy', 'Eggs', 'Gluten', 'Nuts', 'Seafood', 'Mushrooms'];

  const navigate = useNavigate();

  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const bmiValue = (formData.weight / ((formData.height / 100) ** 2)).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        bmi: bmiValue,
      }));
      assignBMICategory(bmiValue);
    }
  };

  const assignBMICategory = (bmiValue) => {
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = 'Normal Weight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = 'Overweight';
    } else if (bmiValue >= 30 && bmiValue <= 34.9) {
      category = 'Obesity Class 1';
    } else if (bmiValue >= 35 && bmiValue <= 39.9) {
      category = 'Obesity Class 2';
    } else {
      category = 'Obesity Class 3';
    }
    setFormData((prevData) => ({
      ...prevData,
      bmiCategory: category,
    }));
  };

  useEffect(() => {
    calculateBMI();
  }, [formData.weight, formData.height]);

  const handleSubmit = (event) => {
    event.preventDefault();

    calculateBMI();

    fetch('http://localhost:8000/api/save-user-data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        localStorage.setItem('userToken', data.token);
        navigate('/thank-you');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Place the provided return JSX here
  return (
    <form onSubmit={handleSubmit}>
      <h1>Personalized Food Plan</h1>

      <label htmlFor="goal">Select Your Goal</label>
      <select
        id="goal"
        value={formData.goal}
        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
        required
      >
        <option value="">Select Goal</option>
        <option value="weight_maintenance">Weight Maintenance</option>
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
      </select>

      <label htmlFor="exercise">Exercise Category</label>
      <select
        id="exercise"
        value={formData.exercise}
        onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
        required
      >
        <option value="">Exercise Category</option>
        <option value="sedentary">Sedentary</option>
        <option value="lightly_active">Lightly Active</option>
        <option value="moderate">Moderate</option>
        <option value="very_active">Very Active</option>
        <option value="super_active">Super Active</option>
      </select>

      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />

      <label htmlFor="weight">Weight (kg)</label>
      <input
        id="weight"
        type="number"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        required
      />

      <label htmlFor="height">Height (cm)</label>
      <input
        id="height"
        type="number"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        required
      />

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="dietaryPreference">Dietary Preference</label>
      <select
        id="dietaryPreference"
        value={formData.dietaryPreference}
        onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
        required
      >
        <option value="">Dietary Preference</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="non_vegetarian">Non-Vegetarian</option>
        <option value="keto">Keto</option>
        <option value="gluten_free">Gluten-Free</option>
        <option value="no_preference">No Preference</option>
      </select>

      <label htmlFor="cookingTime">Preferred Cooking Time (minutes)</label>
      <input
        id="cookingTime"
        type="number"
        placeholder="Preferred Cooking Time"
        value={formData.cookingTime}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value >= 0) {
            setFormData({ ...formData, cookingTime: value });
          }
        }}
        required
      />

      <div className="allergies-container">
        <label>Allergies (select all that apply):</label>
        {predefinedAllergies.map((allergy) => (
          <div key={allergy}>
            <input
              type="checkbox"
              id={allergy}
              name="allergies"
              value={allergy}
              onChange={(e) => {
                const selectedAllergies = formData.allergies || [];
                if (e.target.checked) {
                  setFormData({ ...formData, allergies: [...selectedAllergies, allergy] });
                } else {
                  setFormData({
                    ...formData,
                    allergies: selectedAllergies.filter((a) => a !== allergy),
                  });
                }
              }}
            />
            <label htmlFor={allergy}>{allergy}</label>
          </div>
        ))}
      </div>

      <div className="bmi-section">
        <p>BMI: {formData.bmi}</p>
        <p>BMI Category: {formData.bmiCategory}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
