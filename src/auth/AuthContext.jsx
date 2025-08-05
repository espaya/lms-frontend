import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ added to delay route rendering

    const fetchUser = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/user', {
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false); // ✅ done loading
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>{children}</AuthContext.Provider>;
};
