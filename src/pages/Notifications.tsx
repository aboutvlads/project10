import React, { useState } from 'react';
import { ArrowRight, Bell, Mail, Phone } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Notifications() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false
  });

  const handleFinish = async () => {
    if (!user) {
      setError('No user found. Please sign in again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Updating user profile...', { userId: user.id, preferences });
      
      // First check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingProfile) {
        console.log('Updating existing profile');
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ 
            onboarding_completed: true,
            notification_preferences: preferences,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      } else {
        console.log('Creating new profile');
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              onboarding_completed: true,
              notification_preferences: preferences,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (insertError) throw insertError;
      }

      console.log('Profile updated successfully');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card>
        <h1 className="text-3xl font-bold text-[#1B1B1B] text-center mb-4">
          How should we notify you?
        </h1>
        <p className="text-[#757575] text-center mb-8">
          Choose how you want to receive deal alerts
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <div className="space-y-4 mb-8">
          {[
            {
              id: 'email',
              icon: Mail,
              title: 'Email Notifications',
              description: 'Get detailed deal alerts straight to your inbox'
            },
            {
              id: 'push',
              icon: Bell,
              title: 'Push Notifications',
              description: 'Instant alerts when new deals match your preferences'
            },
            {
              id: 'sms',
              icon: Phone,
              title: 'SMS Alerts',
              description: 'Get text messages for time-sensitive deals'
            }
          ].map(({ id, icon: Icon, title, description }) => (
            <button
              key={id}
              onClick={() => setPreferences(prev => ({
                ...prev,
                [id]: !prev[id as keyof typeof prev]
              }))}
              className={`w-full p-4 rounded-xl border-2 transition-colors text-left flex items-center gap-4 ${
                preferences[id as keyof typeof preferences]
                  ? 'border-[#1B1B1B] bg-[#F5F5F5]'
                  : 'border-[#E5E5E5] hover:border-[#1B1B1B]'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                preferences[id as keyof typeof preferences]
                  ? 'bg-[#1B1B1B] text-white'
                  : 'bg-[#F5F5F5] text-[#1B1B1B]'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B1B1B]">{title}</h3>
                <p className="text-sm text-[#757575]">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/preferences')}
            className="w-full sm:w-auto order-2 sm:order-1"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={handleFinish}
            className="w-full sm:w-auto order-1 sm:order-2"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Finish'} {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}