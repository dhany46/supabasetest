import { useState, useEffect } from 'react';
import AdminDashboardDesktop from './components/AdminDashboardDesktop';
import AdminDashboardMobile from './components/AdminDashboardMobile';

export default function AdminDashboard() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 768;

    return isMobile ? <AdminDashboardMobile /> : <AdminDashboardDesktop />;
}
