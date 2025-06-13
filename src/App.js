import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "../src/components/layout/Main";
import Task from './pages/Task/Page/Task';
import trTR from 'antd/lib/locale/tr_TR'; // Ant Design Türkçe yerelleştirme
import { ConfigProvider } from 'antd';



function App() {
  
  
  return (
    <div className="App">
      <ConfigProvider locale={trTR}>
        <Router
        basename="/qualitymanagement"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
    
            <Route path="/Task" element={<Main><Task /></Main>} />
    
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}
export default App;