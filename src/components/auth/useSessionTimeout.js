import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionTimeout = (timeoutDuration = 60 * 60 * 1000) => {
  const navigate = useNavigate();
  const sessionTimeoutId = useRef(null); // Using useRef to keep track of timeout

  useEffect(() => {
    // Handle the session timeout behavior
    const handleTimeout = () => {
      alert('Session has timed out. Please log in again.');
      navigate('/login');
    };

    // Start the session timeout when the component mounts
    const startTimeout = () => {
      if (sessionTimeoutId.current) {
        clearTimeout(sessionTimeoutId.current); // Clear any existing timeout
      }
      sessionTimeoutId.current = setTimeout(handleTimeout, timeoutDuration); // Start a new timeout
    };

    startTimeout(); // Initialize the timeout on mount

    // Clean up timeout when the component unmounts
    return () => {
      if (sessionTimeoutId.current) {
        clearTimeout(sessionTimeoutId.current);
      }
    };
  }, [navigate, timeoutDuration]);

  // Function to reset the timeout manually on user activity
  const resetSessionTimeout = () => {
    if (sessionTimeoutId.current) {
      clearTimeout(sessionTimeoutId.current); // Clear the existing timeout
    }
    sessionTimeoutId.current = setTimeout(() => {
      alert('Session has timed out. Please log in again.');
      navigate('/login');
    }, timeoutDuration); // Restart the timeout
  };

  return resetSessionTimeout; // Return the reset function
};

export default useSessionTimeout;
