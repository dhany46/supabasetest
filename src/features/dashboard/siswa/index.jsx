import { useState, useEffect } from 'react';
import StudentDashboardDesktop from './components/StudentDashboardDesktop';
import StudentDashboardMobile from './components/StudentDashboardMobile';

export default function StudentDashboard() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 768;

    return isMobile ? <StudentDashboardMobile /> : <StudentDashboardDesktop />;
}
