import React from 'react';
import { Table, Tag, Typography } from 'antd';
import '../index.css';

const { Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <Text strong>{name}</Text>,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <Text>{email}</Text>,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (username) => <Tag color='geekblue'>{username}</Tag>,
  },
  {
    title: 'Phone No.',
    key: 'phone',
    dataIndex: 'phone',
    render: (phone) => <Text>{phone.split(' ')[0]}</Text>,
  },
  {
    title: 'Website',
    key: 'website',
    dataIndex: 'website',
    render: (website) => <Text code>{website}</Text>,
  },
];

function TableComponent(props) {
  //Nested Row Data
  const expandedRowRender = (record) => {
    const expandedColumns = [
      {
        title: 'Street',
        key: 'street',
        dataIndex: 'address',
        render: ({ street }) => <Text>{street}</Text>,
      },
      {
        title: 'Suite',
        key: 'suite',
        dataIndex: 'address',
        render: ({ suite }) => <Text>{suite}</Text>,
      },
      {
        title: 'City',
        key: 'city',
        dataIndex: 'address',
        render: ({ city }) => <Text>{city}</Text>,
      },
      {
        title: 'ZIP',
        key: 'zipcode',
        dataIndex: 'address',
        render: ({ zipcode }) => <Text>{zipcode}</Text>,
      },
    ];

    return (
      <Table
        columns={expandedColumns}
        dataSource={props.data.filter((val) => val.id === record.id)}
        pagination={false}
      />
    );
  };

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        rowClassName={(record) =>
          props.highlightedRows.length > 0 &&
          props.highlightedRows.includes(record.id)
            ? 'selected-row'
            : 'random'
        }
        dataSource={props.data}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
        }}
        pagination={false}
      />
    </>
  );
}

export default TableComponent;
