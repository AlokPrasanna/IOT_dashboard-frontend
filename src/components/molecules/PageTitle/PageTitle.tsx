import React from 'react';
import "./pageTitle.scss";
import { useTheme } from '../../../context/Theme/ThemeContext';

interface PageTitleProps {
    title:string,
    subTitle:string
}

const PageTitle:React.FC<PageTitleProps> = ({title , subTitle}) => {
    const {colors} = useTheme();

    if(colors){
        document.documentElement.style.setProperty('--page_title_bgcolor' , colors.primary[400]);
        document.documentElement.style.setProperty('--text_color' , colors.grey[100]);
        document.documentElement.style.setProperty('--subtitle_color' , colors.greenAccent[400]);
    }
  return (
    <div className='page-title-content'>
      <span className='page-title'>{title}</span>
      <p className='page-subtitle'>{subTitle}</p>
    </div>
  )
}

export default PageTitle
