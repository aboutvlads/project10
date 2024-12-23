import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check if user profile exists
        supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile, error }) => {
            if (error && error.code !== 'PGRST116') {
              console.error('Error checking profile:', error);
              navigate('/');
              return;
            }

            if (!profile) {
              // Create new profile
              supabase
                .from('user_profiles')
                .insert([
                  {
                    id: session.user.id,
                    email: session.user.email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    onboarding_completed: true
                  }
                ])
                .then(({ error: insertError }) => {
                  if (insertError) {
                    console.error('Error creating profile:', insertError);
                    navigate('/');
                    return;
                  }
                  navigate('/dashboard');
                });
            } else {
              // Profile exists
              navigate('/dashboard');
            }
          });
      } else {
        navigate('/');
      }
    });
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
