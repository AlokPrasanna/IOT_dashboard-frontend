import React from 'react';
import { HeaderBar } from './components/molecules';
import './App.css';
import { useTheme } from './context/Theme/ThemeContext';

const App: React.FC = () => {
  const {colors} = useTheme();
  return (
   <div style={{backgroundColor:colors.blueAccent[400] , width:"100%" , height: "100vh"}}>
      <HeaderBar />
   </div>
  );
};

export default App;
