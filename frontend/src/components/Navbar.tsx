import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import useAuthStore from '@/store/AuthStore';
import {message} from 'antd'

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { authState } = useAuthStore();
  
  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/sign-in");
    message.success("Logged out successfully");
  };

   const isLoggedIn = authState.user

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 z-10 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600" onClick={() => navigate('/')}>
            Feedback Portal
          </span>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={() => navigate('/add-feedback')}>Submit Feedback</Button>
              <Button variant="ghost" onClick={() => navigate('/feedback')}>My Feedback</Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/sign-in')}>Login</Button>
              <Button variant="default" onClick={() => navigate('/sign-up')}>Register</Button>
            </>
          )}
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
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/add-feedback')}>Submit Feedback</Button>
                <Button variant="ghost" onClick={() => navigate('/feedback')}>My Feedback</Button>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/sign-in')}>Login</Button>
                <Button variant="default" onClick={() => navigate('/sign-up')}>Register</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}