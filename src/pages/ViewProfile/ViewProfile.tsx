import React from 'react';
import "./viewProfile.scss";
import { PageTitle } from '../../components/molecules';
import { Image } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';
//import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';

const ViewProfile:React.FC = () => {
  const {colors} = useTheme();
  //const userId = localStorage.getItem('userId');
  //const { error , loading } = useFetch({path:`users/one/${userId}`}); 
  const loading = false;
  const error = null;
 
  if(colors){
    document.documentElement.style.setProperty("--text-color" , colors.grey[100]);
    document.documentElement.style.setProperty("--bg-color" , colors.primary[400]);
  }
  return (
    <div className='view-profile-content'>
      <PageTitle 
        title='Profile Details'
        subTitle=''
      />

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' , height:"50vh"}}>
          <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
          <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
        </div>
      ): !loading && error !== null ? (
        <span className='error-msg'>{error}</span>
      ): !loading && error === null &&( 
        <div className='view-profile-details'>
          <Image 
            src={"../../unknown-user.png"}
            alt='profile-image'
            style={{width:"250px"}}
          />
          <div className='profile-details'>
            <p>John Doe</p>
            <p>john.doe@example.com</p>
            <p>123456789V</p>
            <p>+1234567890</p>
            <p>Male</p>
            <p>1990-01-01</p>
            <p>1234 Elm Street, Springfield, USA</p>
          </div>
          <div className='empty'></div>
        </div>
      )}
    </div>
  )
}

export default ViewProfile
