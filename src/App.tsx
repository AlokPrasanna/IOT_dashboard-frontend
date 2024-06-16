import React, { useState } from 'react';
import { HeaderBar , SideBar } from './components/molecules';
import { BarChart , Dashboard , Devices , LineChart , PieChart , Users } from './pages';
import './App.css';
import { useTheme } from './context/Theme/ThemeContext';
import { Route , Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [isCollapsed , setIsCollapsed] = useState(false);
  const {theme , colors} = useTheme();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
   <div className='app' style={{backgroundColor: theme=== 'dark' ? colors.primary[500]: "#fcfcfc"}}>
      <div className={` ${isCollapsed === true ? "collapsed" : "app-sidebar"}`}>
        <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      </div>
      <main className="app-content">
        <HeaderBar />
        <Routes>
          <Route path='/'  element={<Dashboard />}/>
          <Route path='/barchart'  element={<BarChart />}/>
          <Route path='/devices'  element={<Devices />}/>
          <Route path='/linechart'  element={<LineChart />}/>
          <Route path='/piechart'  element={<PieChart />}/>
          <Route path='/users'  element={<Users isCollapsed={isCollapsed} />}/>
        </Routes>
      </main>
   </div>
  );
};

export default App;
