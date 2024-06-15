import React from 'react';
import { HeaderBar , SideBar } from './components/molecules';
import './App.css';
import { useTheme } from './context/Theme/ThemeContext';

const App: React.FC = () => {
  const {colors} = useTheme();
  return (
   <div className='app' style={{backgroundColor: colors.primary[400]}}>
      <div className='app-sidebar'>
        <SideBar />
      </div>
      <main className='app-content'>
        <HeaderBar />
      </main>
   </div>
  );
};

export default App;
