import React from 'react';
import './ThankYouPage.css'; // Custom CSS for the page

function ThankYouPage() {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>🎉 Thank You for Completing the Form!</h1>
        <p>Your personalized food plan is being generated...</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <p>We're analyzing your preferences and generating recommendations based on your goals. This might take a few moments.</p>
        <p>Stay tuned!</p>
      </div>
    </div>
  );
}

export default ThankYouPage;

