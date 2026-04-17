import { Clock, Home, Menu, PieChart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Timeline', path: '/timeline', icon: Clock },
        { name: 'Stats', path: '/stats', icon: PieChart },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight">
                            <img src={logo} alt="KeenKeeper Logo" className="h-8 w-auto object-contain" />
                        </Link>
                    </div>

                    <div className="hidden sm:flex space-x-4">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${isActive
                                            ? "bg-[#244D3F] text-white"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 px-3 py-3 rounded-sm text-base font-medium ${isActive
                                            ? "bg-[#244D3F] text-white"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}