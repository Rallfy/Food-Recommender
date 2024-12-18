import React from 'react';
import { useLocation } from 'react-router-dom';
import './MinimalistDesign.css';

function Recommendations() {
    const location = useLocation();
    const recommendations = location.state?.recommendations || []; // Access recommendations passed via state

    return (
        <div className="container">
            <h1>Recommended Meals</h1>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((meal, index) => (
                        <li key={index}>
                            <h3>{meal.name}</h3>
                            <p>Calories: {meal.calories}</p>
                            <p>Protein: {meal['protein (PDV)']}</p>
                            <p>Sugar: {meal['sugar (PDV)']}</p>
                            <p>Carbohydrates: {meal['carbohydrates (PDV)']}</p>
                            <h4>Steps:</h4>
                            <ol>
                                {Array.isArray(meal.steps) ? (
                                    meal.steps.map((step, stepIndex) => (
                                        <li key={stepIndex}>{step}</li>
                                    ))
                                ) : (
                                    <li>No steps provided</li>
                                )}
                            </ol>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations found. Please try again.</p>
            )}
        </div>
    );
}

export default Recommendations;
