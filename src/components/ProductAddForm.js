import React from 'react';
import { Button, Col, Form, Input, Row, TreeSelect } from 'antd';

const layout = {labelCol: {span: 24,},wrapperCol: {span: 20, }, size:"medium"};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',},
  number: {
    range: '${label} must be between ${min} and ${max}',},
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const ProductAddForm = () => (
  <Form {...layout} name="nest-messages" onFinish={onFinish} style={{maxWidth: 580, marginLeft: '30px', marginTop: '10px'}}  validateMessages={validateMessages} >
    <Form.Item name={['product', 'name']} label="Product Name" rules={[{required: true,},]}  style={{ marginBottom: '6px' }} >
      <Input />
    </Form.Item>
    <Row gutter={0}>
      <Col span={11}>
      <Form.Item name={['product', 'code']} label="Product Code" rules={[{required: true,},]} style={{ marginBottom: '6px' }}>
      <Input />
    </Form.Item>
      </Col>
      <Col span={11}>
      <Form.Item name={['product', 'price']} label="Unit Price" rules={[{required: true,},]} style={{ marginBottom: '6px' }}>
      <Input />
    </Form.Item>
      </Col>
    </Row>
    <Form.Item name={['product', 'brand']} label="Brand" rules={[{required: true,},]} style={{ marginBottom: '6px' }}>
      <Input />
    </Form.Item>
    <Form.Item name={['product', 'category']} label="Category" rules={[{required: true,},]} style={{ marginBottom: '6px' }}>
    <TreeSelect
          treeData={[
            {
              title: 'Light',
              value: 'light',
              children: [
                {
                  title: 'Bamboo',
                  value: 'bamboo',
                },
              ],
            },
          ]}
        />
    </Form.Item>
    <Form.Item name={['product', 'introduction']} label="Introduction" rules={[{required: true,},]} style={{ marginBottom: '30px' }}>
      <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }}/>
    </Form.Item>
    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 0,}} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default ProductAddForm;