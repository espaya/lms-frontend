import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [successMsg, setSuccessMsg] = useState(""); // Added success message state
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  const clearSuccessMsg = () => {
    setSuccessMsg("");
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Get CSRF token first
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // const csrfToken = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("XSRF-TOKEN="))
      //   ?.split("=")[1];

      const csrfToken = Cookies.get("XSRF-TOKEN");

      const response = await fetch(`${apiBase}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
      } else {
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }

        setSuccessMsg(data.message || "Login successful!");
        setUser(data.user); // Set the user data immediately from login response
        return data.user; // Return the user data directly from login response
      }
    } catch (error) {
      setErrors({ general: error.message });
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setUser(null);
        return null;
      }

      const response = await fetch(`${apiBase}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // Remove credentials: "include" for pure token auth
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData;
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("auth_token");
        setUser(null);
        return null;
      } else {
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      return null;
    } finally {
      if (initialLoad) {
        setInitialLoad(false);
      }
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiBase}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setSuccessMsg("Logged out successfully!"); // Set logout success message
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("auth_token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        loading,
        initialLoad,
        login,
        logout,
        successMsg, // Expose successMsg to components
        setSuccessMsg, // Expose setter
        clearSuccessMsg, // Expose cleaner function
        errors,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
