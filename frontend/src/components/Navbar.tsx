import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import useAuthStore from '@/store/AuthStore';
import { message } from 'antd';

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState } = useAuthStore();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/sign-in");
    message.success("Logged out successfully");
  };

  const user = authState.user;
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const renderButtons = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return (
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        );
      }

      return (
        <>
          <Button variant="ghost" onClick={() => navigate('/add-feedback')}>Submit Feedback</Button>
          <Button variant="ghost" onClick={() => navigate('/feedback')}>My Feedback</Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </>
      );
    }

    return (
      <Button variant="default" onClick={() => navigate('/sign-in')}>
        Login / Register
      </Button>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 z-10 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
            Feedback Portal
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && !isAdmin && (
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          )}
          {renderButtons()}

        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6">
          <div className="flex flex-col space-y-3">
            {isLoggedIn && !isAdmin && (
              <Button variant="ghost" onClick={() => {
                navigate('/');
                setIsMenuOpen(false); 
              }}>
                Home
              </Button>
            )}
            {renderButtons()}

          </div>
        </div>
      )}
    </nav>
  );
}
