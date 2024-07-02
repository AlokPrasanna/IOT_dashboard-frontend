import React, { useState } from 'react';
import { HeaderBar , SideBar , Footer } from './components/molecules';
import { 
  BarChartPage, 
  Dashboard,
  Devices, 
  DevicesManager, 
  LineChartPage, 
  PieChartPage, 
  Users,
  Login,
  EditProfile,
  ViewProfile,
  DeviceView
} from './pages';
import './App.css';
import { useTheme } from './context/Theme/ThemeContext';
import { Route , Routes , useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const [isCollapsed , setIsCollapsed] = useState(false);
  const {theme , colors} = useTheme();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
   <div className='app' style={{backgroundColor: theme=== 'dark' ? colors.primary[500]: "#fcfcfc"}}>
      {location.pathname !== "/" && (
        <div className={` ${isCollapsed === true ? "collapsed" : "app-sidebar"}`}>
          <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>
      )}
      <main className="app-content">
        {location.pathname !== "/" && (
          <HeaderBar />
        )}
        <Routes>
          <Route path='/'  element={<Login />}/>
          <Route path='/edit-profile'  element={<EditProfile isCollapsed={isCollapsed} />}/>
          <Route path='/view-profile'  element={<ViewProfile />}/>
          <Route path='/dashboard'  element={<Dashboard isCollapsed={isCollapsed} />}/>
          <Route path='/barchart'  element={<BarChartPage />}/>
          <Route path='/devices'  element={<Devices />}/>
          <Route path='/devices-manager'  element={<DevicesManager />}/>
          <Route path='/device-view/:deviceId'  element={<DeviceView />}/>
          <Route path='/linechart'  element={<LineChartPage />}/>
          <Route path='/piechart'  element={<PieChartPage />}/>
          <Route path='/users'  element={<Users isCollapsed={isCollapsed} />}/>
        </Routes>
        <Footer />
      </main>
   </div>
  );
};

export default App;
