import { useEffect, useState } from "react";

const STORAGE_KEY = "course_user_email";

export function useSimpleAuth() {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load email from localStorage on mount
        const storedEmail = localStorage.getItem(STORAGE_KEY);
        setEmail(storedEmail);
        setLoading(false);
    }, []);

    const signIn = (userEmail: string) => {
        const emailLower = userEmail.toLowerCase().trim();
        localStorage.setItem(STORAGE_KEY, emailLower);
        setEmail(emailLower);
    };

    const signOut = () => {
        localStorage.removeItem(STORAGE_KEY);
        setEmail(null);
    };

    return {
        email,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!email,
    };
}
