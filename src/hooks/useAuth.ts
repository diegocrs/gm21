import { useState, useEffect } from 'react';
import { UserData } from '../types';

export const useAuth = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('gluteChallenge_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData: UserData) => {
        setUser(userData);
        localStorage.setItem('gluteChallenge_user', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('gluteChallenge_user');
        setUser(null);
    };

    const updateUser = (updatedUser: UserData) => {
        setUser(updatedUser);
        localStorage.setItem('gluteChallenge_user', JSON.stringify(updatedUser));
    };

    return { user, loading, login, logout, updateUser };
};
