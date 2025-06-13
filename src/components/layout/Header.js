import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  Button,
  Typography, Dropdown, Menu
} from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";


function Header({

  subName
}) {
  const { Title, Text } = Typography;


  useEffect(() => window.scrollTo(0, 0));


  const location = useLocation();


  // const { logOut } = useLogin();
  // const userMenu = (
  //   <Menu onClick={() => logOut()}>
  //     <Menu.Item key="logout" 
  //     icon={<LogoutOutlined 
  //     />}
  //     >
  //       Çıkış Yap
  //     </Menu.Item>
  //   </Menu>
  // );


  return (
    <>

      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          {/* <Breadcrumb>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize", color: location.pathname == "/AddProject" ? 'white' : '#8c8c8c' }}
            >
               {
                subName == "CreateAppointment" ? "Randevu Oluştur" :
                  subName == "appointments" ? "Randevular":
                  subName == "getAppointment" ?"Randevu Detayı":
                  subName == "Task" ?"İş Listesi":
                  subName == "Calendar" ?"takvim":" "

              } 
            </span>
          </div> */}
        </Col>
        <Col span={24} md={18} className="header-control">
         
        </Col>
        
      </Row>
    </>
  );
}

export default Header;
