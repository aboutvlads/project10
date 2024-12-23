import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          // Check if user profile exists
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!profile && (!profileError || profileError.code === 'PGRST116')) {
            // Create new profile if it doesn't exist
            await supabase.from('user_profiles').insert([
              {
                id: session.user.id,
                email: session.user.email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                onboarding_completed: false
              }
            ]);
            navigate('/onboarding', { replace: true });
          } else if (profile?.onboarding_completed) {
            navigate('/dashboard', { replace: true });
          } else {
            navigate('/onboarding', { replace: true });
          }
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/', { replace: true });
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
