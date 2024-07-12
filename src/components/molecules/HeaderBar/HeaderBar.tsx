import React, { useEffect } from 'react';
import { useTheme } from '../../../context/Theme/ThemeContext';
import {Icon} from '../../atoms';
import "./headerBar.scss";
import { useNavigate , useLocation  } from 'react-router-dom';

const HeaderBar: React.FC = () => {
    const { theme,  toggleTheme  , colors} = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const handelChangePages = (url:string) => () => {
        navigate(url);
    }

    if(colors){
        document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
        document.documentElement.style.setProperty('--text-color' , colors.grey[100]);  
    }

    useEffect(() => {
        const svgElements = document.querySelectorAll('.svg') as NodeListOf<HTMLElement>;

        svgElements.forEach(svg => {
            svg.addEventListener('mouseenter', handleMouseEnter);
        });

        return () => {
            svgElements.forEach(svg => {
                svg.removeEventListener('mouseenter', handleMouseEnter);
            });
        };
    }, []);

    const handleMouseEnter = (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const tooltip = target.getAttribute('data-tooltip');
        if (tooltip) {
            const afterElement = window.getComputedStyle(target, '::after');
            const tooltipWidth = parseFloat(afterElement.width);
            const svgWidth = target.offsetWidth;

            const rightValue = Math.max(0, (svgWidth - tooltipWidth) / 2) + 'px';
            target.style.setProperty('--right-value', rightValue);
        }
    }

    const handelLogout = () => {
        if(confirm("Are you sure to log out?")){
            localStorage.setItem('userId' , '');
            navigate("/");
        }
    }
    return (
        <div className='content'>
        <div className="body-content">
            {theme === "dark" ? (
                <div id='1' className='svg' data-tooltip='Change Theme' >
                    <Icon
                        icon={
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg> 
                        }
                        onclick={toggleTheme}
                        style={{ cursor: 'pointer' , color:'white', width:"25px" , background:"none" , border:"none"}}
                    />
                </div>
            ) : (
                <div id='2' className='svg' data-tooltip='Change Theme'>
                    <Icon
                        icon={
                            <svg data-tooltip='Change Theme' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        }
                        onclick={toggleTheme}
                        style={{ cursor: 'pointer',  color:'black', width:"25px" , background:"none" , border:"none" }}
                    />
                </div>
            )}
            <div id='3' className='svg' data-tooltip='Edit Profile'>
                <Icon
                    icon={
                        <svg data-tooltip='Edit Profile' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    }
                    onclick={handelChangePages("/edit-profile")}
                    style={{ 
                            cursor: 'pointer', 
                            color:theme === "dark" ? "white" : "black", 
                            width:"25px", 
                            background:"none", 
                            border:"none",
                            ...(location.pathname === "/edit-profile" && { color: colors.blueAccent[400] }) 
                        }}
                />
            </div>
            <div id='4' className='svg' data-tooltip='View Profile'>
                <Icon
                    icon={
                        <svg data-tooltip='View Profile' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    }
                    onclick={handelChangePages("/view-profile")}
                    style={{ 
                        cursor: 'pointer', 
                        color:theme === "dark" ? "white" : "black", 
                        width:"25px", 
                        background:"none", 
                        border:"none",
                        ...(location.pathname === "/view-profile" && { color: colors.blueAccent[400] })
                    }}
                />
            </div>
            <div id='5' className='svg' data-tooltip='Log Out'>
                <Icon
                    icon={
                        <svg data-tooltip='Log Out' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                        </svg>
                    }
                    onclick={handelLogout}
                    style={{ 
                        cursor: 'pointer', 
                        color:theme === "dark" ? "white" : "black", 
                        width:"25px", 
                        background:"none", 
                        border:"none"
                    }}
                />
            </div>
        </div>
        </div>
    );
};

export default HeaderBar;
