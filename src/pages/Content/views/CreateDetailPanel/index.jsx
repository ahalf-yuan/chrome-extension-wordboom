/**
 * The panel for editting word item detail
 * including:
 * - source word
 * - zh translate
 * - en translate
 * - origin sentence
 * - from webpage { url, icon }
 */
import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Icon, { CloseOutlined } from '@ant-design/icons';
// import airplane from '../../../../assets/content/airplane.svg';
import './index.css';

const airplaneSVG = chrome.runtime.getURL('airplane.svg');

const { TextArea } = Input;

function CreateDetailPanel(props) {
  const { selectedText } = props;
  return (
    props.visible && (
      <Card
        title={
          <div className="panel-header">
            <span>添加单词</span>
            <div>
              <Button shape="round">
                确定{' '}
                <img
                  alt=""
                  src={airplaneSVG}
                  style={{ height: '20px', marginLeft: '4px' }}
                />
              </Button>
              <CloseOutlined onClick={props.onCancel} />
            </div>
          </div>
        }
        size="small"
        bodyStyle={{ padding: 0 }}
        className="detail-panel-container"
      >
        <div className="title-panel">
          <h3 className="word">{selectedText}</h3>
        </div>

        <div className="form-wrapper">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="上下文" name="username">
              <TextArea
                bordered={false}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 2, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="翻译" name="username">
              <TextArea
                bordered={false}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="笔记" name="username">
              <TextArea
                bordered={false}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <Form.Item label="来源标题" name="username">
              <Input bordered={false} />
            </Form.Item>
            <Form.Item label="来源链接" name="username">
              <Input bordered={false} />
            </Form.Item>
            <Form.Item label="来源图标" name="username">
              <Input bordered={false} />
            </Form.Item>
          </Form>
        </div>
      </Card>
    )
  );
}

export default CreateDetailPanel;
