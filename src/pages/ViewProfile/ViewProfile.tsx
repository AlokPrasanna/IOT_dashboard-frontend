import React from 'react';
import "./viewProfile.scss";
import { PageTitle } from '../../components/molecules';
import { Image } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';

const ViewProfile:React.FC = () => {
  const {colors} = useTheme();
 
  if(colors){
    document.documentElement.style.setProperty("--text-color" , colors.grey[100]);
  }
  return (
    <div className='view-profile-content'>
      <PageTitle 
        title='Profile Details'
        subTitle=''
      />
      <div className='view-profile-details'>
        <Image 
          src='../../user.jpg'
          alt='profile-image'
          style={{width:"250px"}}
        />
        <div className='profile-details'>
          <p>Alok Prasanna</p>
          <p>alokprasanna1104@gmail.com</p>
          <p>199830910519</p>
          <p>071981116</p>
          <p>Male</p>
          <p>1998/11/04</p>
          <p>501/1, Punchi Mandawala, Mandawala</p>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
