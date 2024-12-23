import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Processing auth callback...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          throw error;
        }

        if (session?.user) {
          console.log('User authenticated:', session.user.id);
          
          // Check if user profile exists
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error checking profile:', profileError);
            throw profileError;
          }

          // Create profile if it doesn't exist
          if (!profile) {
            console.log('Creating new user profile');
            const { error: insertError } = await supabase
              .from('user_profiles')
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  onboarding_completed: true // Set to true by default for now
                }
              ])
              .select()
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
              throw insertError;
            }

            // Redirect to dashboard for new users
            console.log('New user, redirecting to dashboard');
            navigate('/dashboard');
            return;
          }

          // For existing users, check onboarding status
          if (profile.onboarding_completed) {
            console.log('Onboarding completed, redirecting to dashboard');
            navigate('/dashboard');
          } else {
            console.log('Redirecting to onboarding');
            navigate('/onboarding');
          }
        } else {
          console.log('No session found, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [supabase, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
