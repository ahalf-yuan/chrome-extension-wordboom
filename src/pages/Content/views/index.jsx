import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import Translate from './Translate';
import './index.css';

function App() {
  useEffect(() => {
    const listenMessage = (event) => {
      if (!event.data) return;
      if (!typeof event.data === 'object') {
        return;
      }

      try {
        const { wordboom_selection } = event.data || {};
        if (wordboom_selection) {
          console.log('value =>', wordboom_selection);
        }
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener('message', listenMessage);

    return () => {
      // cleanup
      window.removeEventListener('message', listenMessage);
    };
  }, []);

  return <Translate />;
}

ReactDOM.render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
