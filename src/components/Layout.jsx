import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
    const [timeline, setTimeline] = useState([]);
    const [toasts, setToasts] = useState([]);
    const location = useLocation();

    useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

    const addTimelineEntry = useCallback((entry) => {
        setTimeline(prev => [{ ...entry, id: Date.now().toString(), date: new Date().toISOString() }, ...prev]);
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
                <Outlet context={{ timeline, addTimelineEntry, addToast }} />
            </main>
            <Footer />
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map(toast => (
                    <div key={toast.id} className="px-4 py-3 rounded-md shadow-lg text-white bg-emerald-600">{toast.message}</div>
                ))}
            </div>
        </div>
    );
}