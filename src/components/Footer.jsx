import { Link } from 'react-router-dom';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import logoXl from '../assets/logo-xl.png';
import twitter from '../assets/twitter.png';

export default function Footer() {
    return (
        <footer className="bg-[#244D3F] text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <img src={logoXl} alt="KeenKeeper Logo" className="h-10 w-auto mb-2 object-contain hidden md:block" />
                <h2 className="text-3xl font-bold mb-2 md:hidden">KeenKeeper</h2>
                <p className="text-emerald-100/80 mb-8 text-center max-w-md text-sm">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                <div className="mb-6">
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-medium mb-4 text-center">Social Links</h3>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/kawsarcodes" className="hover:opacity-80 transition-opacity">
                                <img
                                    src={instagram}
                                    alt="Instagram"
                                    className="w-10 h-10 p-1 bg-white rounded-full object-contain"
                                />
                            </a>
                            <a href="https://facebook.com/kawsarcodes" className="hover:opacity-80 transition-opacity">
                                <img
                                    src={facebook}
                                    alt="Facebook"
                                    className="w-10 h-10 p-1 bg-white rounded-full object-contain"
                                />
                            </a>
                            <a href="https://x.com/kawsarcodes" className="hover:opacity-80 transition-opacity">
                                <img
                                    src={twitter}
                                    alt="Twitter"
                                    className="w-10 h-10 p-1 bg-white rounded-full object-contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full border-t border-emerald-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-100/60">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
