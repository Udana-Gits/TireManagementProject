import { useEffect } from 'react';
import useSessionTimeout from './useSessionTimeout';

const SessionTimeoutComponent = ({ children }) => {
  const resetSessionTimeout = useSessionTimeout(); // Retrieve the reset function

  useEffect(() => {
    const handleUserActivity = () => {
      resetSessionTimeout(); // Reset the timeout whenever user activity is detected
    };

    // Add event listeners for detecting user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchmove', handleUserActivity);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchmove', handleUserActivity);
    };
  }, [resetSessionTimeout]);

  return <div>{children}</div>; // Wrap around children components
};

export default SessionTimeoutComponent;
