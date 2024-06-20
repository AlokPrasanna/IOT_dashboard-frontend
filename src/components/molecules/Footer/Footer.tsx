import React from 'react';
import "./footer.scss"
import { useTheme } from '../../../context/Theme/ThemeContext';

const Footer:React.FC = () => {
    const {colors} = useTheme();

    if(colors) {
        document.documentElement.style.setProperty("--text-color" , colors.grey[100])
    }
  return (
    <footer className='footer-content'>
        &copy; All rights reserved
    </footer>
  )
}

export default Footer
