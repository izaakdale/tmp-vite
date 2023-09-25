import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let url = import.meta.env.VITE_BACKEND_WEBSOCKET_ADDR;
    const ws = new WebSocket(url);

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = 'data')) {
          setMessage(json.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      if (ws.readyState === ws.OPEN) {
        ws.close();
      }
    };
  }, []);

  return <div className='flex w-full justify-center space-x-8'>{message}</div>;
}

export default App;
