import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import MiniPanel from './MiniPanel';
import CreateDetailPanel from './CreateDetailPanel';
import { WORDBOOM_ID, WORDBOOM_EE_VISIBLE_MINIPANEL } from '../helper/constant';
import './index.css';

const feichuanSVG = chrome.runtime.getURL('feichuan.svg');

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 }); // icon pos
  const [panelStyle, setPanelStyle] = useState({});
  const [selectedText, setSelectedText] = useState('');
  const [showFollowIcon, setShowFollowIcon] = useState(false);
  const [showMiniPanel, setShowMiniPanel] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  useEffect(() => {
    document.addEventListener(WORDBOOM_EE_VISIBLE_MINIPANEL, function (e) {
      const { x, y, selectedText, visible } = e.detail;
      setShowFollowIcon(visible);

      if (!visible) return;

      setPos({ x, y });
      setSelectedText(selectedText);
    });
    return () => {
      // clear
    };
  }, []);

  useEffect(() => {
    if (!showFollowIcon) {
      setShowMiniPanel(false);
      setShowDetailPanel(false);
    }
  }, [showFollowIcon]);

  useEffect(() => {
    if (showMiniPanel && showDetailPanel) {
      setPanelStyle({
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      });
    } else if (showMiniPanel) {
      setPanelStyle({
        left: pos.x,
        top: pos.y,
      });
    }
  }, [showMiniPanel, showDetailPanel, pos]);

  return (
    <div className="wordboom-app" onClick={(e) => e.stopPropagation()}>
      {showFollowIcon && (
        <img
          src={feichuanSVG}
          style={{ left: pos.x, top: pos.y }}
          className="App-logo"
          alt="logo"
          onClick={() => setShowMiniPanel(true)}
        />
      )}

      <div className="panel-wrapper" style={panelStyle}>
        <MiniPanel
          visible={showMiniPanel}
          selectedText={selectedText}
          onCancel={() => setShowMiniPanel(false)}
          onClickWordIcon={() => setShowDetailPanel(true)} // click collect btn around word
        />

        <CreateDetailPanel
          visible={showDetailPanel}
          onCancel={() => setShowDetailPanel(false)}
        />
      </div>

      {showDetailPanel && (
        <div className="mask" onClick={() => setShowFollowIcon(false)}></div>
      )}
    </div>
  );
}

const interval = setInterval(() => {
  const wordboom_app = document.querySelector(`#${WORDBOOM_ID}`);

  if (wordboom_app) {
    const shadowRoot = wordboom_app.shadowRoot;
    ReactDOM.render(<App />, shadowRoot);
    clearInterval(interval);
  }
}, 500);

if (module.hot) module.hot.accept();
