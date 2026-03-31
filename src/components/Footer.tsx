import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Footer = () => (
  <footer className="bg-foreground text-background py-12 mt-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold">SSK Travel</span>
          </div>
          <p className="text-sm opacity-70">Your trusted travel partner since 2020. We make dream vacations a reality.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/trips" className="hover:opacity-100 transition-opacity">All Trips</Link>
            <Link to="/login" className="hover:opacity-100 transition-opacity">Login</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <p>info@ssktravel.com</p>
            <p>+1 (555) 123-4567</p>
            <p>123 Travel Street, NYC</p>
          </div>
        </div>
      </div>
      <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
        © 2026 SSK Travel Agencies. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
