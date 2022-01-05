import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import MiniPanel from './MiniPanel';
import CreateDetailPanel from './CreateDetailPanel';
import { WORDBOOM_ID, WORDBOOM_EE_VISIBLE_MINIPANEL } from '../helper/constant';
import { postTranslate } from '../../../services/actions';
import { getUserInfo } from '../../../services/actions/user';

import './index.css';

const feichuanSVG = chrome.runtime.getURL('feichuan.svg');

function App() {
  const [selectedText, setSelectedText] = useState('');
  const [sentence, setSelectedSentence] = useState('');
  const [transData, setTransData] = useState({});
  const [saved, setSaved] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // icon pos
  const [panelStyle, setPanelStyle] = useState({}); // panel pos
  const [showFollowIcon, setShowFollowIcon] = useState(false);
  const [showMiniPanel, setShowMiniPanel] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  useEffect(() => {
    document.addEventListener(WORDBOOM_EE_VISIBLE_MINIPANEL, function (e) {
      const { x, y, visible, selectedText, sentence } = e.detail;
      setShowFollowIcon(visible);

      if (!visible) return;

      setPos({ x, y });
      setSelectedText(selectedText);
      setSelectedSentence(sentence);
    });
    return () => {
      // clear
    };
  }, []);

  useEffect(() => {
    setSaved(false);
  }, [selectedText]);

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

  const handlePopupTranslate = () => {
    if (showMiniPanel) return;

    if (selectedText && selectedText.length > 0) {
      postTranslate(selectedText).then((transData) => {
        if (!transData) return;

        const { basic, translation, web, query } = transData;
        setTransData({
          basic: basic || {},
          query,
          translation,
          web,
        });

        setShowMiniPanel(true);
      });
    }
  };

  const handleClickWordIcon = () => {
    // 其他接口 401 ，需要跟新这里
    if (!window.wordboom_userinfo) {
      getUserInfo()
        .then((res) => {
          window.wordboom_userinfo = res;
          setShowDetailPanel(true);
        })
        .catch((err) => {});
    } else {
      setShowDetailPanel(true);
    }
  };

  const handleSaveSuccess = (isSuccess) => {
    setShowDetailPanel(false);
    setSaved(true);
  };

  return (
    <div className="wordboom-app" onClick={(e) => e.stopPropagation()}>
      {showFollowIcon && (
        <img
          src={feichuanSVG}
          style={{ left: pos.x, top: pos.y }}
          className="App-logo"
          alt="logo"
          onClick={handlePopupTranslate}
        />
      )}

      <div className="panel-wrapper" style={panelStyle}>
        <MiniPanel
          visible={showMiniPanel}
          selectedText={selectedText}
          transData={transData}
          saved={saved}
          onCancel={() => setShowMiniPanel(false)}
          onClickWordIcon={handleClickWordIcon} // click collect btn around word
        />
        <CreateDetailPanel
          details={{ selectedText, sentence }}
          transData={transData}
          visible={showDetailPanel}
          onSuccess={handleSaveSuccess}
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
