import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import ThankYouPage from './ThankYouPage';
import Recommendations from './Recommendations'; // Import the Recommendations component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserForm />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
}

export default App;

