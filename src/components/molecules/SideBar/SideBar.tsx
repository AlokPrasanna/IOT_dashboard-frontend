import React, { useState } from 'react';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { Icon } from '../../atoms';
import "./sidebar.scss"

const SideBar: React.FC = () => {
    const { colors , theme } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar-content ${isCollapsed ? 'collapsed' : ''}`}>
           <div className='sidebar-head'>
            <p style={{color:colors.grey[100]}}>IOT Dashboard</p>
            <Icon 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                }
                onclick={toggleSidebar}
                style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" , width:"20px" , background:"none" , border:"none" }}
            />
           </div>
            <div className='sidebar-inner-content'>
                {/* Your sidebar content here */}
            </div>
        </div>
    );
}

export default SideBar;
