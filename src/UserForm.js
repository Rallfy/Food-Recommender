import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './UserForm.css';

function UserForm() {
  const [formData, setFormData] = useState({
    goal: '',
    exercise: '',
    age: '',
    weight: '',
    height: '',
    bmi: '',
    bmiCategory: ''
  });

  const navigate = useNavigate();  // Hook for navigation

  // Function to calculate BMI
  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const bmiValue = (formData.weight / ((formData.height / 100) ** 2)).toFixed(2);
      setFormData(prevData => ({
        ...prevData,
        bmi: bmiValue
      }));
      assignBMICategory(bmiValue);
    }
  };

  // Function to assign BMI category
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
    setFormData(prevData => ({
      ...prevData,
      bmiCategory: category
    }));
  };

  // Recalculate BMI every time weight or height changes
  useEffect(() => {
    calculateBMI();
  }, [formData.weight, formData.height]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure BMI is calculated before submitting
    calculateBMI();

    fetch('http://localhost:8000/api/save-user-data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      localStorage.setItem('userToken', data.token);
      // Navigate to the Thank You page after successful form submission
      navigate('/thank-you');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })} required>
        <option value="">Select Goal</option>
        <option value="weight_maintenance">Weight Maintenance</option>
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
      </select>
      
      <select value={formData.exercise} onChange={e => setFormData({ ...formData, exercise: e.target.value })} required>
        <option value="">Exercise Category</option>
        <option value="sedentary">Sedentary</option>
        <option value="lightly_active">Lightly Active</option>
        <option value="moderate">Moderate</option>
        <option value="very_active">Very Active</option>
        <option value="super_active">Super Active</option>
      </select>
      
      <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} required />
      
      <input type="number" placeholder="Weight (kg)" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} required />
      
      <input type="number" placeholder="Height (cm)" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} required />
      
      <p>BMI: {formData.bmi}</p>
      <p>BMI Category: {formData.bmiCategory}</p>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
