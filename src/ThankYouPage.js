import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MinimalistDesign.css'; 

function ThankYouPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { recommendations } = location.state || {};

    const handleViewRecommendations = () => {
        navigate('/recommendations', { state: { recommendations } });
    };

    return (
        <div className="container">
            <h1>Thank You for Completing the Form!</h1>
            <p>Your food plan has been generated.</p>
            <button onClick={handleViewRecommendations}>View Recommendations</button>
        </div>
    );
}

export default ThankYouPage;
