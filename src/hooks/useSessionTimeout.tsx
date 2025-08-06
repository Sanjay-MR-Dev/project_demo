import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

const EXPIRY_TIME = 60 * 60 * 1000;

const useSessionTimeout = () => {
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSession = useCallback(() => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert("Session Timeout..!");
        navigate('/login');
    }, [navigate]);

    const resetTime = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            handleSession();
        }, EXPIRY_TIME);
    }, [handleSession]);

    useEffect(() => {
        resetTime();
        const events = ["mousemove", "click", "scroll", "keydown"];
        const activeHandler = () => resetTime();
        events.forEach(event => window.addEventListener(event, activeHandler));

        return () => {
            events.forEach(event => window.removeEventListener(event, activeHandler));
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }

    }, [resetTime]);
}

export default useSessionTimeout;