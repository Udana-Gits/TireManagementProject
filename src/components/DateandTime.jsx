import React, { useState, useEffect } from 'react';

function DateandTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p> {date.toDateString()}  {date.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default DateandTime;