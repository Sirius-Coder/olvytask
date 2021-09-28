import './App.css';
import { Row, Col } from 'antd';
import Intro from './Components/Intro';
import ContentArea from './Components/ContentArea';
function App() {
  return (
    <div className='App' style={{ background: '#f3f5f8', height: '100vh' }}>
      <Row>
        <Col xs={24} className='ant-p-3'>
          <Intro />
        </Col>
        <Col xs={24} style={{ padding: '1rem' }}>
          <ContentArea />
        </Col>
      </Row>
    </div>
  );
}

export default App;
