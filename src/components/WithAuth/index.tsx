import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// HOC to check if there is a user in localStorage
const withAuth = (WrappedComponent: React.ElementType) => {
    const Wrapper = (props: any) => {
        const [loggedUser, setUser] = useState<string | null>(null);
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        const router = useRouter();

        useEffect(() => {
            // Get the user from localStorage, if available
            setUser(user);

            // If there is no user, redirect the user to the login page
            if (!user) {
                router.replace('/');
            }
        }, [user]);

        const handleLogout = () => {
            // Remove the user variable from localStorage when the user logs out
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
            setUser(null);
            // Redirect the user to the login page
            router.replace('/');
        };
        
        return <WrappedComponent {...props} user={loggedUser} handleLogout={handleLogout} />;
    };

    return Wrapper;
};

export default withAuth;
