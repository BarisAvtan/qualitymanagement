import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix, Button, Col, Row } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { LeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined,MenuOutlined } from "@ant-design/icons";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#0c4b80");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      {/* Collapse Button */}
      <Button
        onClick={() => setCollapsed(!collapsed)}
        className="brand"
        style={{
          position: 'fixed', // Fixed position to stay on the screen
          zIndex: 999,       // Keep it on top of other elements
          bottom: 20,        // Distance from the bottom of the screen
          left: 20,          // Distance from the left of the screen
          backgroundColor: '#0A4D80',
          borderColor: '#0A4D80',
          color: '#fff' 



        }}
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
        <span><MenuOutlined /> Menü</span>
        </Button>

      {/* Sider */}
      <Sider
        breakpoint="sm"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        collapsed={collapsed} // Controlled collapsed state
        trigger={null} // Remove default trigger
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
          }`}
        style={{ background: "transparent" }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 250, // Adjust margin when Sider is collapsed or expanded
          transition: "margin-left 0.3s", // Smooth transition
        }}
      >
        {/* Header */}
        {/* {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}> */}
        {/* <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              /> */}
        {/* </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}> */}
        {/* <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            /> */}
        {/* </AntHeader>
        )} */}
        {pathname == 'calendar' ?
          <Row style={{ marginLeft: 10,marginTop:30,marginBottom:10, alignItems: 'center', justifyContent: 'center' }}>

            <Col span={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    backgroundColor: '#81b2da',
                    marginRight: 8, // Spacing between the circle and text
                  }}
                ></div>

                {/* Text */}
                <span
                  style={{
                    paddingTop: 2, // Small adjustment to align text perfectly
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Montaj Kaydı
                </span>
              </div>
            </Col>
            
            <Col span={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Circle */}
                <div style={{
                  width: 15,
                  height: 15,
                  borderRadius: 8,
                  backgroundColor: '#f4d35f',
                  marginRight: 8, // Add spacing between the circle and text
                }}></div>

                {/* Text */}
                <span style={{ paddingTop: 2, fontSize: 12, fontWeight: 700, }}>Arıza Kaydı</span>
              </div>
            </Col>

            <Col span={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Circle */}
                <div style={{
                  width: 15,
                  height: 15,
                  borderRadius: 8,
                  backgroundColor: '#e29b99',
                  marginRight: 8, // Add spacing between the circle and text
                }}></div>

                {/* Text */}
                <span style={{ paddingTop: 2, fontSize: 12, fontWeight: 700, }}>Kapalı</span>
              </div>
            </Col>
          </Row>:<></>
        }

        {/* Content */}
        <Content className="content-ant" style={{ marginTop: pathname == 'calendar' ? 10 : 50 }}>{children}</Content>

        {/* Footer */}
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
