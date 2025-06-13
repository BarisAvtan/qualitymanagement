import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Spin size="large" style={{ color: '#0c4b80' }} />
    </div>
  );
};

export default Spinner;
