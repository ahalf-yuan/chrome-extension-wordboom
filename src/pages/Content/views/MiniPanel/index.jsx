import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import './index.css';

const MiniPanel = (props) => {
  const { pos, selectedText } = props;

  const handleOk = () => {};

  return (
    <Modal
      title=""
      visible={props.visible}
      getContainer={false}
      onOk={handleOk}
      onCancel={() => props.onCancel()}
      width={300}
      style={{ left: pos.x, top: pos.y }}
    >
      <p>{selectedText}</p>
    </Modal>
  );
};

export default MiniPanel;
