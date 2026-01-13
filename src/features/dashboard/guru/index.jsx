import { useState, useEffect } from 'react';
import TeacherDashboardDesktop from './components/TeacherDashboardDesktop';
import TeacherDashboardMobile from './components/TeacherDashboardMobile';

export default function TeacherDashboard() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 768;

    return isMobile ? <TeacherDashboardMobile /> : <TeacherDashboardDesktop />;
}
