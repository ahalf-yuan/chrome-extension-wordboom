import React, { useEffect, useState } from 'react';
import { Card, Collapse } from 'antd';
import {
  FileAddOutlined,
  StarOutlined,
  CloseOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import { dictUrl } from '../../helper/constant';

import './index.css';

const MiniPanel = (props) => {
  const { transData } = props;

  const colors = [
    'rgb(255, 202, 215)',

    'rgb(255, 222, 112)',

    'rgb(255, 251, 120)',

    'rgb(209, 255, 97)',

    'rgb(180, 255, 235)',
  ];

  return (
    props.visible && (
      <Card bodyStyle={{ padding: 0 }} className="content-page-wrapper">
        <div className="color-wrapper">
          <div className="left">
            {/* base64 的图片最好使用 background 的方式，js文件修改后，diff 的内容很多 */}
            <span className="color-panel"></span>

            {colors.map((color) => (
              <span key={color} style={{ background: color }}></span>
            ))}
          </div>

          <CloseOutlined onClick={props.onCancel} />
        </div>
        <TransTempl {...transData} onClickWordIcon={props.onClickWordIcon} />
      </Card>
    )
  );
};

/**
 * query
 * basic: { explains: [], uk-phonetic: '', uk-speech: '', us-phonetic: '', us-speech: '' }
 * translation: []
 * web: [{key: '', value: []}]
 *
 * @param {*} props
 */
function TransTempl(props) {
  const { query, basic = {}, translation, web } = props;
  const [displayWebPanel, setDisplayWebPanel] = useState(false);

  const header = (
    <div className="youdao-header">
      {dictUrl.map(({ key, url }) => (
        <img
          key={key}
          style={{ width: '16px', marginRight: '6px' }}
          alt=""
          src={url}
        />
      ))}
    </div>
  );
  return (
    <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
      <Collapse.Panel header={header} key="1">
        <div className="youdao-panel">
          <h2>
            <span className="marginRight8">{query}</span>
            {/* TODO: according to status */}
            {/* onClickWordIcon 上下传递了3次，需优化 */}
            <StarOutlined onClick={() => props.onClickWordIcon()} />
          </h2>
          {/* <p>{translation}</p> */}
          {/* if basic. logoc */}

          <div className="phonetic">
            <span>美：[{basic['uk-phonetic']}]</span>
            <span>英：[{basic['us-phonetic']}]</span>
          </div>

          <div className="explains">
            {basic.explains &&
              basic.explains.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
          </div>

          <h4
            className="web-panel-title"
            onClick={() => setDisplayWebPanel(!displayWebPanel)}
          >
            {!displayWebPanel ? (
              <PlusSquareOutlined />
            ) : (
              <MinusSquareOutlined />
            )}{' '}
            <span>网络释义</span>
          </h4>
          <ul
            className="web-details"
            style={{ display: displayWebPanel ? 'block' : 'none' }}
          >
            {web &&
              web.map((item) => (
                <li key={item.key}>
                  <strong>{item.key}</strong>
                  <span>：{item.value.join(',')}</span>
                </li>
              ))}
          </ul>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}

export default MiniPanel;
