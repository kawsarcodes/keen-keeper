import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  const [timeline, setTimeline] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('timeline_entries');
    if (saved) {
      try {
        setTimeline(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeline_entries', JSON.stringify(timeline));
  }, [timeline]);

  const addTimelineEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    setTimeline(prev => [newEntry, ...prev]);
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ timeline, addTimelineEntry, addToast }} />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
