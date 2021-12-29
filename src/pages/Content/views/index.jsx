import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
// import { Button, Image } from 'antd';
import Translate from './Translate';
import './index.css';

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener('wordboom_ee', function (e) {
      console.log(e.detail);
      setShow(true);
      const { x, y, selectedText } = e.detail;
      setPos({ x, y });
    });

    document.addEventListener('wordboom_ee_hidden', function (e) {
      setShow(false);
    });
    return () => {};
  }, []);

  const url = chrome.runtime.getURL('feichuan.svg');

  return (
    <>
      {show && (
        <img
          src={url}
          style={{ left: pos.x, top: pos.y }}
          className="App-logo"
          alt="logo"
        />
      )}
    </>
  );
}

const interval = setInterval(() => {
  const wordboom_app = document.querySelector('#wordboom_app');

  if (wordboom_app) {
    const shadowRoot = wordboom_app.shadowRoot;
    ReactDOM.render(<App />, shadowRoot);
    clearInterval(interval);
  }
}, 500);

if (module.hot) module.hot.accept();
