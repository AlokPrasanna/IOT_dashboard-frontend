import React, {ReactNode} from 'react';
import "./dashboardCard.scss"
import { Icon } from '../../atoms';
import { useTheme } from '../../../context/Theme/ThemeContext';

interface DashboardCardProps {
  icon:ReactNode;
  title:string;
  count:number;
  isCollapsed:boolean
}

const DashboardCard:React.FC<DashboardCardProps> = ({icon , title , count , isCollapsed=false}) => {
  const {colors , theme} = useTheme();

  if(colors){
    document.documentElement.style.setProperty("--bg-color" , colors.primary[400]);
    document.documentElement.style.setProperty("--text-color" , colors.grey[100]);
    document.documentElement.style.setProperty("--count-color" , colors.greenAccent[400]);
  }

  if(isCollapsed){
    document.documentElement.style.setProperty("--width" ,"23.1%")
  }else{
    document.documentElement.style.setProperty("--width" ,"23%")
  }

  const handleClick = () => {};
  return (
    <div className='dashboard-card-content'>
      <div className='dashboard-card-dis'>
        <Icon 
          icon={icon}
          onclick={handleClick}
          style={{ color:theme === "dark" ? "white" : "black" ,  width:"47px" , background:"none" , border:"none"  }}
        />
        <p>{title}</p>
      </div>
      <div className='dashboard-card-data'>
        <span>{count}</span>
      </div>
    </div>
  )
}

export default DashboardCard;
