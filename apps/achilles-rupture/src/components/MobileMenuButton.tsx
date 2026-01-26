import { Turn as Hamburger } from 'hamburger-react';
import { useState, useEffect } from 'react';

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (toggled: boolean) => {
    setIsOpen(toggled);
    
    // Toggle the mobile menu visibility
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      if (toggled) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    }
  };

  return (
    <div className="md:hidden">
      <Hamburger 
        toggled={isOpen}
        toggle={handleToggle}
        direction="left"
        size={24}
        color="#374151"
        duration={0.3}
        label="Toggle menu"
      />
    </div>
  );
}
