import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Typography,
  Select,
  Input,
  Button,
  Form,
  Tag,
} from 'antd';
import Table from './TableComponent';

const { Title, Text } = Typography;
const { Option } = Select;

//Tab List for the Query Builder
const tabList = [
  {
    key: 'name',
    tab: 'Name',
  },
  {
    key: 'username',
    tab: 'Username',
  },
];

function ContentArea() {
  const [userData, setUserData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('name');
  const [selectedQuery, setSelectedQuery] = useState({});
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [nameForm] = Form.useForm();
  const [usernameForm] = Form.useForm();
  const [dataCopy, setDataCopy] = useState([]);
  //Fetch the Data from a Public API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        setUserData(data);
        setDataCopy(data);
      })
      .catch((e) => console.error(e));
  }, []);

  //Add Query and Change the Table Data Accordingly
  const addQuery = (name, values) => {
    setSelectedQuery({
      attribute: name,
      measure: values.measure,
      value: values.value,
    });
    usernameForm.resetFields();
    nameForm.resetFields();

    if (name === 'name') {
      switch (values.measure) {
        case 'equals':
          setHighlightedRows(
            dataCopy
              .filter(
                (user) => user.name.toLowerCase() === values.value.toLowerCase()
              )
              .map((user) => user.id)
          );
          break;
        case 'include':
          setHighlightedRows(
            dataCopy
              .filter((user) =>
                user.name.toLowerCase().includes(values.value.toLowerCase())
              )
              .map((user) => user.id)
          );
          break;
        case 'notinclude':
          setHighlightedRows(
            dataCopy
              .filter(
                (user) =>
                  !user.name.toLowerCase().includes(values.value.toLowerCase())
              )
              .map((user) => user.id)
          );
          break;
        default:
          setUserData(userData);
      }
    } else if (name === 'username') {
      switch (values.measure) {
        case 'equals':
          setHighlightedRows(
            dataCopy
              .filter(
                (user) =>
                  user.username.toLowerCase() === values.value.toLowerCase()
              )
              .map((user) => user.id)
          );
          break;
        case 'startsWith':
          setHighlightedRows(
            dataCopy
              .filter((user) =>
                user.username
                  .substr(0, values.value.length)
                  .toLowerCase()
                  .includes(values.value.toLowerCase())
              )
              .map((user) => user.id)
          );
          break;
        case 'endsWith':
          setHighlightedRows(
            dataCopy
              .filter((user) =>
                user.username
                  .substr(-values.value.length)
                  .toLowerCase()
                  .includes(values.value.toLowerCase())
              )
              .map((user) => user.id)
          );
          break;
        default:
          setUserData(userData);
      }
    }
  };

  //Clear Query
  const clearQuery = () => {
    setSelectedQuery({});
    setUserData(dataCopy);
    setHighlightedRows([]);
  };

  //Content for the Tabs in Query Builder
  const contentList = {
    name: (
      <Form
        name='query_name'
        form={nameForm}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => {
          addQuery('name', values);
        }}
      >
        <Form.Item
          name='measure'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please select a measure!' }]}
        >
          <Select placeholder='Choose a Measure' style={{ width: '50%' }}>
            <Option value='equals'>Equals</Option>
            <Option value='include'>Includes</Option>
            <Option value='notinclude'>Not Includes</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='value'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please enter a value!' }]}
        >
          <Input placeholder='Enter value' />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      </Form>
    ),
    username: (
      <Form
        name='query_username'
        form={usernameForm}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => {
          addQuery('username', values);
        }}
      >
        <Form.Item
          name='measure'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please select a measure!' }]}
        >
          <Select placeholder='Choose a Measure' style={{ width: '50%' }}>
            <Option value='equals'>Equals</Option>
            <Option value='startsWith'>Starts With</Option>
            <Option value='endsWith'>Ends With</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='value'
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please enter a value!' }]}
        >
          <Input placeholder='Enter value' />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  return (
    <Row>
      <Col xs={6} align='center' className='ant-p-2'>
        <Col xs={24} align='center'>
          <Card
            title={<Title level={5}>Your Queries</Title>}
            bordered
            style={{ borderRadius: '15px', width: '80%' }}
          >
            {selectedQuery.hasOwnProperty('attribute') ? (
              <Tag closable onClose={clearQuery} color='magenta'>
                {selectedQuery.attribute} {selectedQuery.measure}{' '}
                {selectedQuery.value}{' '}
              </Tag>
            ) : (
              <Text>You haven't selected any queries </Text>
            )}
          </Card>
        </Col>
        <Col xs={24} align='center' style={{ marginTop: '3rem' }}>
          <Card
            title={<Title level={5}>Build Your Query</Title>}
            bordered
            style={{ borderRadius: '15px', width: '80%' }}
            tabList={tabList}
            onTabChange={(key) => {
              setSelectedTab(key);
            }}
          >
            {contentList[selectedTab]}
          </Card>
        </Col>
      </Col>
      <Col xs={18} align='center'>
        <Table data={userData} highlightedRows={highlightedRows} />
      </Col>
    </Row>
  );
}

export default ContentArea;
