import React from 'react';
import { PageHeader, Typography } from 'antd';

const { Title } = Typography;

function Intro() {
  return (
    <>
      <PageHeader
        title={<Title level={3}>Welcome to Google Sheets MVP 🚀</Title>}
        subTitle={
          <Title level={5}>
            You can query against the data using the Query builder
          </Title>
        }
        style={{ background: '#fff' }}
      />
    </>
  );
}

export default Intro;
