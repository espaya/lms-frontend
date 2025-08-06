import Cookies from 'js-cookie';

export const logoutUser = async (setUser, fetchUser) => {
    try {
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            credentials: 'include',
        });

        const csrfToken = Cookies.get('XSRF-TOKEN');

        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
            },
        });

        window.location.href = '/'; // or use `navigate('/login')`
    } catch (err) {
        console.error('Logout failed: ' + err);
    }
};
