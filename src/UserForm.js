import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    numMeals: 3, // Default to 3 meals
    allergies: [], // Track selected allergies
  });

  const predefinedAllergies = ['Dairy', 'Eggs', 'Gluten', 'Nuts'];

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/save-user-data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log('Success:', data);
          navigate('/thank-you', { state: { recommendations: data.recommendations } });
      })
      .catch((error) => {
          console.error('Error:', error);
      });  
  };

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
        <option value="weight_loss">Weight Loss</option>
        <option value="weight_maintenance">Weight Maintenance</option>
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
        <option value="no_preference">No Preference</option>
      </select>

      <label htmlFor="numMeals">Number of Meals</label>
      <input
        id="numMeals"
        type="number"
        min="1"
        placeholder="Number of Meals"
        value={formData.numMeals}
        onChange={(e) => setFormData({ ...formData, numMeals: e.target.value })}
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

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;