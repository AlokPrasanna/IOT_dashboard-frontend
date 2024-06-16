import React from 'react';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { Icon  , Image} from '../../atoms';
import "./sidebar.scss";
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({isCollapsed , toggleSidebar}) => {
    const navigate = useNavigate();
    const { colors, theme } = useTheme();
    
    if(colors){
        document.documentElement.style.setProperty('--hover-color', colors.blueAccent[400]);  
    }

    const HandelNavigate = (url:string) => () => {
        navigate(url);
    }

    return (
        <div className={`sidebar ${isCollapsed === true ? "collaps" : ""}`} style={{backgroundColor:colors.primary[400]}}>
            <div className="top">
                <div className="logo">
                    <span className='sidebar-header-title' style={{color: colors.grey[100]}}>IOT Dashboard</span>
                    <Icon 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>        
                        }
                        onclick={toggleSidebar}
                        style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none"  }}
                    />
                </div>
            </div>
            <div className="user">
                <div className='user-image'>
                <Image 
                    src='./user.jpg'
                    alt='user'
                    style={{cursor:'pointer' , width:"50px", borderRadius:"100%", border:`1px solid ${colors.grey[100]}`, display:'flex' , justifyContent:'center' , alignItems:'center'}}
                />
                </div>
                <div>
                    <p style={{color: colors.grey[100]}}>Alok Prasanna</p>
                </div>
            </div>
            <ul>
                <li className='hover-icon' onClick={HandelNavigate("/")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" , }}
                    />
                    <span style={{color: colors.grey[100]}}>Dashboard</span>
                </li>
                <li onClick={HandelNavigate("/devices")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                        </svg>
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" }}
                    />
                    <span style={{color: colors.grey[100]}}>Devices</span>
                </li>
                <li onClick={HandelNavigate("/users")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" }}
                    />
                    <span style={{color: colors.grey[100]}}>Users</span>
                </li>
                <li onClick={HandelNavigate("/barchart")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>    
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" }}
                    />
                    <span style={{color: colors.grey[100]}}>Bar Chart</span>
                </li>
                <li onClick={HandelNavigate("/linechart")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" }}
                    />
                    <span style={{color: colors.grey[100]}}>Line Chart</span>
                </li>
                <li onClick={HandelNavigate("/piechart")}>
                    <Icon 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                        </svg>
                    }
                    onclick={toggleSidebar}
                    style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"25px" , background:"none" , border:"none" }}
                    />
                    <span style={{color: colors.grey[100]}}>Pie Chart</span>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
