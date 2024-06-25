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
          <p>Jone Dio</p>
          <p>jone@gmail.com</p>
          <p>200200200200</p>
          <p>0222222222</p>
          <p>Male</p>
          <p>1990/01/01</p>
          <p>101 Maple St, Springfield, IL 62704</p>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
