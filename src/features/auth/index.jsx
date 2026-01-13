import { useState, useEffect } from 'react';
import LoginFormDesktop from './components/LoginFormDesktop';
import LoginFormMobile from './components/LoginFormMobile';

export default function AuthPage() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 768;

    return isMobile ? <LoginFormMobile /> : <LoginFormDesktop />;
}
