/**
 * The panel for editting word item detail
 * including:
 * - source word
 * - zh translate
 * - en translate
 * - origin sentence
 * - from webpage { url, icon }
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Icon, { CloseOutlined } from '@ant-design/icons';
import message from '../../../../helper/message';
import { saveWord, getPageInfo } from '../../../../services/actions/index';
// import airplane from '../../../../assets/content/airplane.svg';
import { getExtUrl } from '../../../../helper/browser';
import './index.css';

const airplaneSVG = getExtUrl('airplane.svg');

const { TextArea } = Input;

function CreateDetailPanel(props) {
  const [pageInfo, setPageInfo] = useState({});
  const [form] = Form.useForm();
  const {
    details: { selectedText, sentence },
  } = props;

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        console.log('Success:', values);
        // onCreate(values);
        saveWord(values).then((res) => {
          console.log('=== view save word =>', res);
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    if (props.visible) {
      getPageInfo()
        .then((res) => {
          const { faviconURL, pageId, pageTitle, pageURL } = res;
          setPageInfo({
            faviconURL,
            pageId,
            pageTitle,
            pageURL,
          });
          // async set field value
          form.setFieldsValue(res);
        })
        .catch((err) => {
          console.error('get page info err:', err);
        });
    }
    return () => {
      // cleanup
    };
  }, [props.visible, form]);

  return (
    props.visible && (
      <Card
        title={
          <div className="panel-header">
            <span>添加单词</span>
            <div>
              <Button shape="round" onClick={onFinish}>
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
            form={form}
            initialValues={{ sentence, ...pageInfo }} // not async
            autoComplete="off"
          >
            <Form.Item label="上下文" name="sentence">
              <TextArea
                bordered={false}
                placeholder="上下文"
                autoSize={{ minRows: 2, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="翻译" name="translate">
              <TextArea
                bordered={false}
                placeholder="翻译"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="笔记" name="note">
              <TextArea
                bordered={false}
                placeholder="笔记"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <Form.Item label="来源标题" name="pageTitle">
              <Input bordered={false} placeholder="来源标题" />
            </Form.Item>
            <Form.Item label="来源链接" name="pageURL">
              <Input bordered={false} placeholder="来源链接" />
            </Form.Item>
            <Form.Item
              label={
                <div>
                  来源图标{' '}
                  <img
                    alt=""
                    src={pageInfo.faviconURL}
                    style={{ width: '20px' }}
                  />
                </div>
              }
              name="faviconURL"
            >
              <Input bordered={false} placeholder="来源图标" />
            </Form.Item>
          </Form>
        </div>
      </Card>
    )
  );
}

export default CreateDetailPanel;
