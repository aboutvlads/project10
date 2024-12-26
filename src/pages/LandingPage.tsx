import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load landing page CSS
    const link = document.createElement('link');
    link.href = '/src/landing-page/css/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load landing page script
    const script = document.createElement('script');
    script.src = '/src/landing-page/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // Load the HTML content from your landing page
  useEffect(() => {
    fetch('/src/landing-page/index.html')
      .then(response => response.text())
      .then(html => {
        // Extract the body content
        const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
        document.getElementById('landing-content')?.insertAdjacentHTML('beforeend', bodyContent);
      });
  }, []);

  return (
    <div id="landing-content">
      {/* Your landing page HTML will be injected here */}
    </div>
  );
}
