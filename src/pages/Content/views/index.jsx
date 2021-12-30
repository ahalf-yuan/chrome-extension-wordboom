import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import MiniPanel from './MiniPanel';
import './index.css';

const feichuanSVG = chrome.runtime.getURL('feichuan.svg');

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [showFollowIcon, setShowFollowIcon] = useState(false);
  const [showMiniPanel, setShowMiniPanel] = useState(false);

  useEffect(() => {
    document.addEventListener('wordboom_ee', function (e) {
      setShowFollowIcon(true);
      const { x, y, selectedText } = e.detail;
      setPos({ x, y });
      setSelectedText(selectedText);
    });

    document.addEventListener('wordboom_ee_hidden', function (e) {
      setShowFollowIcon(false);
    });
    return () => {};
  }, []);

  const handleFollowIconClick = (e) => {
    e.stopPropagation();
    setShowMiniPanel(true);
  };

  return (
    <div>
      {showFollowIcon && (
        <img
          src={feichuanSVG}
          style={{ left: pos.x, top: pos.y }}
          className="App-logo"
          alt="logo"
          onClick={handleFollowIconClick}
        />
      )}

      <MiniPanel
        visible={showMiniPanel}
        selectedText={selectedText}
        pos={pos}
        onCancel={() => setShowMiniPanel(false)}
      />
    </div>
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
