import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';
import { useAuth } from '../context/AuthContext';

export default function Welcome() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signInWithGoogle, signInWithEmail, user, userProfile, isLoading: authLoading } = useAuth();

  // Redirect to how-it-works if already authenticated
  if (user && userProfile && !authLoading) {
    return <Navigate to="/how-it-works" replace />;
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailContinue = async () => {
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      console.log('Attempting to sign in with email:', email);
      const { error } = await signInWithEmail(email);
      
      if (error) {
        console.error('Error from signInWithEmail:', error);
        setMessage(error.message || 'Failed to send magic link');
      } else {
        console.log('Magic link sent successfully');
        setMessage('Check your email for the magic link!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-lg sm:text-xl font-bold text-[#1B1B1B] whitespace-nowrap">
            Create your account
          </h1>
        </div>

        <SocialButton
          icon={
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 flex-shrink-0"
            />
          }
          onClick={handleGoogleSignIn}
          className="w-full"
        >
          Continue with Google
        </SocialButton>

        <Divider text="Or continue with email" />

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email*"
            className="w-full h-12 px-8 rounded-full border-2 border-[#E5E5E5] focus:border-[#1B1B1B] outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && (
            <p className={`text-sm ${message.includes('Check your email') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button
            variant="secondary"
            onClick={handleEmailContinue}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Get started'} {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#757575] text-center">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#1B1B1B] underline hover:text-black">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#1B1B1B] underline hover:text-black">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
}