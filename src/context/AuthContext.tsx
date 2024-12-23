import { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';

const supabase = createClient(
  'https://vjaolwcexcjblstbsyoj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqYW9sd2NleGNqYmxzdGJzeW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NDQ3OTAsImV4cCI6MjA1MDIyMDc5MH0.ITA8YP8f1Yj_MJuyqr6GjFYGmhpnM5x5LGpw4sfbDJw'
);

interface UserProfile {
  id: string;
  email: string;
  home_airport: string;
  bucket_list: string;
  created_at: string;
  updated_at: string;
  onboarding_completed: boolean;
}

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  supabase: SupabaseClient;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const handleAuthStateChange = async (session: any) => {
    setUser(session?.user ?? null);
    
    if (session?.user) {
      const profile = await fetchUserProfile(session.user.id);
      setUserProfile(profile);

      // Handle redirections
      const publicPaths = ['/', '/signin', '/auth/callback'];
      if (publicPaths.includes(location.pathname)) {
        if (profile?.onboarding_completed) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }
    } else {
      setUserProfile(null);
      if (!publicPaths.includes(location.pathname)) {
        navigate('/', { replace: true });
      }
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleAuthStateChange(session);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      await handleAuthStateChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://tripwingz.com/auth/callback',
      },
    });
  };

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'https://tripwingz.com/auth/callback',
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        supabase,
        signInWithGoogle,
        signInWithEmail,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
