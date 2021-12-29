import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import Translate from './Translate';
import feichuanSvg from '../../../assets/followIcon/feichuan.svg';
import './index.css';

function App() {
  useEffect(() => {
    document.addEventListener('wordboom_ee', function (e) {
      console.log(e.detail);
    });
    return () => {};
  }, []);

  return (
    <>
      <img src={feichuanSvg} className="App-logo" alt="logo" />
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
