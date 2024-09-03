import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from '../Button';

const LandingPageNavbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">

          {/* Logo and App Name */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight">Radar</span>
          </div>

          {/* Right Side - Login/Signup Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button to="/auth/login" className="border rounded-md">
              log in
            </Button>
            
            <Button to="/auth/register" className="rounded-md bg-gradient-to-r from-blue-400 to-blue-700">
              create account
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <div className="flex space-x-6">
              <Button to="/login" className="border rounded-md">
                log in
              </Button>
              
              <Button to="/register" className="rounded-md bg-gradient-to-r from-blue-400 to-blue-700">
                create account
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
