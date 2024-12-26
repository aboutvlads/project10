import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page HTML file
    window.location.href = '/landing-page/index.html';
  }, []);

  return null;
}
