import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, Scale } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#262626',
            color: '#FFFFFF',
            border: '1px solid #2F2F2F',
          },
        }}
      />
      <header className="bg-surface/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <Scale className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-text">AI Arbiter</span>
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-text-secondary hover:text-text transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-primary text-background font-bold rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
