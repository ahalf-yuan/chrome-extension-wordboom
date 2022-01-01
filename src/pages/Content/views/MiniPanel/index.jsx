import React, { useEffect, useState } from 'react';
import { Card, Collapse } from 'antd';
import {
  FileAddOutlined,
  StarOutlined,
  CloseOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import { postTranslate } from './service';

import './index.css';

const MiniPanel = (props) => {
  const [transData, setTransData] = useState({});
  const { selectedText } = props;

  useEffect(() => {
    if (props.visible) {
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
        });
      }
    }

    return () => {};
  }, [props.visible, selectedText]);

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

  const youdaoHeader = (
    <div className="youdao-header">
      <img
        style={{ width: '12px', marginRight: '6px' }}
        alt=""
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQwODcxNTY3MTQ5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTkzMS44NCAxMDI0SDkyLjE2Yy01MS4yIDAtOTIuMTYtNDAuOTYtOTIuMTYtOTIuMTZWOTIuMTZDMCA0MC45NiA0MC45NiAwIDkyLjE2IDBoODM3LjEyYzUxLjIgMCA5Mi4xNiA0MC45NiA5Mi4xNiA5Mi4xNnY4MzcuMTJjMi41NiA1My43Ni0zOC40IDk0LjcyLTg5LjYgOTQuNzJ6IiBmaWxsPSIjRDIwQjBBIiBwLWlkPSIyMzQyIj48L3BhdGg+PHBhdGggZD0iTTU1Mi45NiA2MzIuMzJjMzMuMjgtNDAuOTYgNDMuNTItNzQuMjQgMzAuNzItOTkuODQtMTUuMzYtMjguMTYtMzUuODQtNTEuMi03MS42OC01Ni4zMi0yLjU2IDIzLjA0LTUuMTIgNDMuNTItNy42OCA1Ni4zMiAxNy45MiAxNS4zNiAzMy4yOCAyNS42IDQwLjk2IDM4LjQgMTAuMjQgMTUuMzYtMi41NiAzOC40LTIwLjQ4IDM4LjQtMzUuODQgMC02NC0zMC43Mi01OC44OC02Ni41NiAwLTcuNjggMC0xMi44IDIuNTYtMjAuNDggMTcuOTItODEuOTItMzUuODQtMTEwLjA4LTk3LjI4LTExMC4wOC00My41MiAwLTg3LjA0IDcuNjgtMTMwLjU2IDEwLjI0IDUuMTItMzUuODQgMzUuODQtMzguNCA2Ni41Ni0zOC40IDUxLjItMi41NiA5OS44NC01LjEyIDE1MS4wNC0xMC4yNCAxNy45Mi0yLjU2IDM4LjQtNS4xMiAzNS44NC0zMC43MmgtMTk5LjY4YzUuMTItMTIuOCAxMC4yNC0yMy4wNCAxNy45Mi0zOC40LTIwLjQ4LTEwLjI0LTM4LjQtMTcuOTItNjEuNDQtMzAuNzItMTIuOCA3MS42OC01Ni4zMiA5NC43Mi0xMjIuODggNzEuNjgtNS4xMiA1OC44OCA0MC45NiAzNS44NCA3MS42OCA0OC42NC00MC45NiA1MS4yLTc2LjggOTcuMjgtMTE3Ljc2IDE0OC40OCAzOC40IDcuNjggNjEuNDQtMjAuNDggOTcuMjgtMzguNC0xNS4zNiA3OS4zNi0yOC4xNiAxNTEuMDQtNDMuNTIgMjIyLjcyIDMwLjcyIDcuNjggNTYuMzItNS4xMiA2OS4xMi0zNS44NCA3LjY4LTIwLjQ4IDEwLjI0LTQwLjk2IDE3LjkyLTU4Ljg4IDIzLjA0LTcxLjY4IDk5Ljg0LTEyMi44OCAxNzkuMi0xMDQuOTYtMi41NiAxMC4yNC0yLjU2IDE3LjkyLTUuMTIgMjguMTYtMjAuNDggMC00MC45NiAwLTU4Ljg4IDIuNTYtMzMuMjggNS4xMi02MS40NCAyMC40OC02OS4xMiA1Ni4zMi03LjY4IDMzLjI4IDIuNTYgNjEuNDQgMzAuNzIgODEuOTIgNDAuOTYgMjguMTYgODkuNiAzOC40IDE0My4zNiAzOC40IDUuMTItMjguMTYgNy42OC01Ni4zMiAxMi44LTg3LjA0IDEyLjggNy42OCAyMC40OCAxMi44IDMwLjcyIDE1LjM2IDc0LjI0IDQwLjk2IDE1MS4wNCA3Ni44IDIzOC4wOCA4Ny4wNCA4NC40OCAxMC4yNCAxNTguNzItMTUuMzYgMjE3LjYtNzYuOCA1LjEyLTUuMTIgMTAuMjQtMTUuMzYgMTIuOC0yMy4wNC0xNDMuMzYgNzYuOC0yNzMuOTIgNTMuNzYtNDAxLjkyLTE3LjkyeiBtLTE2MS4yOC0xNjguOTZjLTUzLjc2IDIwLjQ4LTEwNy41MiA0MC45Ni0xNTguNzIgNTguODgtNS4xMi0zNS44NCAwLTUzLjc2IDM4LjQtNjEuNDQgMjguMTYtNy42OCA1OC44OC03LjY4IDg3LjA0LTcuNjhoMTIuOGMzMC43MiAwIDIwLjQ4IDEwLjI0IDIwLjQ4IDEwLjI0eiBtLTcuNjggMTQ4LjQ4Yy01LjEyIDI1LjYtNy42OCA1MS4yLTEyLjggNzYuOGgtNS4xMi0yLjU2LTIuNTYtMi41NmMtMi41NiAwLTIuNTYgMC01LjEyLTIuNTYtMi41NiAwLTUuMTItMi41Ni01LjEyLTIuNTZzLTIuNTYgMC0yLjU2LTIuNTZjMCAwLTIuNTYgMC0yLjU2LTIuNTYgMCAwLTIuNTYgMC0yLjU2LTIuNTZoLTIuNTZsLTIuNTYtMi41NmMtMi41NiAwLTIuNTYtMi41Ni0yLjU2LTIuNTYtMi41Ni0yLjU2LTUuMTItNS4xMi01LjEyLTcuNjhsLTIuNTYtMi41NnMwLTIuNTYtMi41Ni0yLjU2Yy0yLjU2LTUuMTItMi41Ni0xMi44LTIuNTYtMTcuOTJ2LTIuNTZjMi41Ni0yOC4xNiAyNS42LTM1Ljg0IDY0LTI1LjZ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSIyMzQzIj48L3BhdGg+PHBhdGggZD0iTTkyNC4xNiAzNDAuNDhjLTI4LjE2IDIuNTYtNTMuNzYgMi41Ni04Ny4wNCA1LjEyIDEyLjgtMTcuOTIgMjAuNDgtMjguMTYgMjguMTYtNDAuOTYtMjAuNDgtMTAuMjQtMzguNC0xNy45Mi01Ni4zMi0yNS42LTMwLjcyIDIwLjQ4LTMzLjI4IDY0LTc0LjI0IDcxLjY4LTUuMTItMjMuMDQtNy42OC00Ni4wOC0xMC4yNC02Ni41Ni01My43NiA3LjY4LTU2LjMyIDEyLjgtNDYuMDggNjkuMTJoLTgxLjkyYzAgMzMuMjggNy42OCA0MC45NiA0My41MiA0MC45Nmg3NC4yNGMwIDIuNTYgMi41NiA3LjY4IDIuNTYgMTAuMjQtMTUuMzYgNS4xMi0zMy4yOCAxMC4yNC00OC42NCAxNy45Mi0xNS4zNiA3LjY4LTQwLjk2IDE3LjkyLTQzLjUyIDMwLjcyLTEyLjggNTYuMzItMTcuOTIgMTE1LjItMjUuNiAxNzYuNjQgNzYuOCA0OC42NCAxNjEuMjggNDAuOTYgMjUwLjg4IDI4LjE2IDUuMTItMzMuMjggNy42OC02MS40NCAxMi44LTg5LjYgMi41Ni0yOC4xNiAxMC4yNC01Ni4zMiAxMC4yNC04NC40OCAyLjU2LTQwLjk2LTEyLjgtNTguODgtNTEuMi02Ni41Ni0xNS4zNi0yLjU2LTMzLjI4LTUuMTItNDguNjQtNy42OCAwLTIuNTYtMi41Ni01LjEyLTIuNTYtNy42OCAxNS4zNi01LjEyIDMwLjcyLTEwLjI0IDQ4LjY0LTEyLjggMjguMTYtNS4xMiA1Ni4zMi01LjEyIDgxLjkyLTEwLjI0IDEyLjgtNy42OCAzMC43Mi0xMi44IDIzLjA0LTM4LjR6TTc4OC40OCA2MTQuNGMtNDMuNTIgMTcuOTItODQuNDggMTIuOC0xMjUuNDQgMCAwLTIuNTYgMi41Ni01LjEyIDUuMTItNy42OCAyLjU2LTIuNTYgMi41Ni01LjEyIDUuMTItNy42OGwyLjU2LTIuNTYgMi41Ni0yLjU2IDIuNTYtMi41NmMyLjU2LTIuNTYgNS4xMi0yLjU2IDcuNjgtNS4xMiAwIDAgMi41NiAwIDIuNTYtMi41NiA1LjEyLTIuNTYgNy42OC0yLjU2IDEyLjgtNS4xMmg1My43NmMxMC4yNCAwIDIwLjQ4IDIuNTYgMzMuMjggNS4xMi0yLjU2IDAgMzAuNzIgNy42OC0yLjU2IDMwLjcyeiBtLTUuMTItNzkuMzZzLTIuNTYgMCAwIDBoLTIuNTYtMi41Ni0yLjU2Yy01LjEyIDAtNy42OCAyLjU2LTEyLjggMi41Ni03LjY4IDIuNTYtMTcuOTIgMi41Ni0yNS42IDUuMTJsLTUzLjc2IDcuNjhjLTUuMTIgMC03LjY4IDIuNTYtMTIuOCAyLjU2di01LjEyLTIuNTYtMi41Ni0yLjU2YzAtMi41NiAwLTUuMTIgMi41Ni03LjY4IDUuMTItMTAuMjQgMTIuOC0xNS4zNiAyNS42LTIwLjQ4IDIuNTYgMCAyLjU2IDAgNS4xMi0yLjU2aDE3LjkyYzI1LjYtMi41NiA1MS4yIDAgNzYuOCAwIDM4LjQgMC0yLjU2IDIwLjQ4LTE1LjM2IDI1LjZ6IG0xNy45Mi03NC4yNGMtNDAuOTYgNy42OC04MS45MiAxNS4zNi0xMjAuMzIgMjMuMDQtNS4xMi0yMy4wNCA1LjEyLTM1Ljg0IDMwLjcyLTQwLjk2IDQ2LjA4LTEyLjggNzQuMjQtNy42OCA4OS42IDE3Ljkyek01MTcuMTIgNDI3LjUybDcuNjgtNjEuNDRjNDYuMDggMTAuMjQgNzQuMjQgNTguODggNjEuNDQgMTA3LjUyLTEyLjgtNy42OC0yMy4wNC0xNS4zNi0zMy4yOC0yMy4wNC0xMC4yNC03LjY4LTIzLjA0LTEyLjgtMzUuODQtMjMuMDR6TTMyMCA2NjAuNDhjMi41NiAyLjU2IDIuNTYgNS4xMiA1LjEyIDcuNjggMC0yLjU2LTIuNTYtNS4xMi01LjEyLTcuNjh6TTM3MS4yIDY4OC42NGMtMjAuNDgtNS4xMi0zNS44NC0xMC4yNC00Ni4wOC0yMC40OCAxMC4yNCAxMC4yNCAyNS42IDE3LjkyIDQ2LjA4IDIwLjQ4eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMjM0NCI+PC9wYXRoPjxwYXRoIGQ9Ik02NzMuMjggNTk2LjQ4Yy0yLjU2IDIuNTYtNS4xMiA1LjEyLTUuMTIgNy42OCAwLTIuNTYgMi41Ni01LjEyIDUuMTItNy42OHpNNzgzLjM2IDUzNS4wNHpNNjgzLjUyIDU1Mi45NmMtNS4xMiAwLTcuNjggMi41Ni0xMi44IDIuNTYgNS4xMi0yLjU2IDcuNjgtMi41NiAxMi44LTIuNTZ6TTc3OC4yNCA1MzUuMDRjMCAyLjU2IDAgMi41NiAwIDAtNS4xMiAyLjU2LTEwLjI0IDIuNTYtMTUuMzYgNS4xMiA1LjEyLTIuNTYgMTAuMjQtMi41NiAxNS4zNi01LjEyIDAgMi41NiAwIDIuNTYgMCAwek03ODAuOCA1MzUuMDRzLTIuNTYgMCAwIDBjLTIuNTYgMCAwIDAgMCAwek03ODAuOCA1MzUuMDR6TTc5Ni4xNiA1MDYuODhjLTI1LjYgMC01MS4yLTIuNTYtNzYuOCAwaC03LjY4IDcuNjhjMjUuNi0yLjU2IDUzLjc2IDAgNzYuOCAwek03ODAuOCA1MzUuMDR6TTc4MC44IDUzNS4wNHpNNzgzLjM2IDUzNS4wNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjIzNDUiPjwvcGF0aD48L3N2Zz4="
      />
      <span>有道词典</span>
    </div>
  );
  return (
    <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
      <Collapse.Panel header={youdaoHeader} key="1">
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
