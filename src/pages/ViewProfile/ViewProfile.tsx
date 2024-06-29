import React from 'react';
import "./viewProfile.scss";
import { PageTitle } from '../../components/molecules';
import { Image } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';
import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';

const ViewProfile:React.FC = () => {
  const {colors} = useTheme();
  const userId = localStorage.getItem('userId');
  const {data , error , loading } = useFetch({path:`users/one/${userId}`}); 
 
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
      ):( 
        <div className='view-profile-details'>
          <Image 
            src={data.user.imageUrl ? data.user.imageUrl : "../../unknown-user.png"}
            alt='profile-image'
            style={{width:"250px"}}
          />
          <div className='profile-details'>
            <p>{data.user.fullName}</p>
            <p>{data.user.emailAddress}</p>
            <p>{data.user.nic}</p>
            <p>{data.user.contact}</p>
            <p>{data.user.gender}</p>
            <p>{data.user.birthday}</p>
            <p>{data.user.address}</p>
          </div>
          <div className='empty'></div>
        </div>
      )}
    </div>
  )
}

export default ViewProfile
