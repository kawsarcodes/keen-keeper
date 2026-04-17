import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col flex-grow justify-center items-center h-[60vh] text-center space-y-6">
      <h1 className="text-9xl font-black text-emerald-800">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
      </div>
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-sm font-medium transition-colors mt-4"
      >
        <Home className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
