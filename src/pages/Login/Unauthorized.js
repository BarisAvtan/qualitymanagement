import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Bu sayfaya erişim yetkiniz bulunmamaktadır."
    //   extra={
    //     <Button type="primary" onClick={() => navigate('/')}>
    //       Giriş Sayfasına Dön
    //     </Button>
    //   }
    />
  );
};

export default Unauthorized;
