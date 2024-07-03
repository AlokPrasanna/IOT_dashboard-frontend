import React from 'react';
import "./userView.scss"
import { PageTitle } from '../../components/molecules';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';
import { useTheme } from '../../context/Theme/ThemeContext';

const UserView:React.FC = () => {
    const {userId} = useParams();
    const {data , loading , error} = useFetch({path:`users/one/${userId}`});
    const {colors} = useTheme();

    if (colors) {
        document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
        document.documentElement.style.setProperty('--text', colors.grey[100]);
        document.documentElement.style.setProperty('--btn-clear', colors.redAccent[500]);
        document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[500]);
        document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
    }
  return (
    <div className='user-view-profile'>
      <PageTitle 
        title='User View'
        subTitle='This is User Details View Page'
      />
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh" }}>
          <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
          <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
        </div>
      ): !loading && error !== null ? (
        <span className='error-msg'>{error}</span>
      ): !loading && error === null && data !== null && (
        <div className='user-view-profile-body'>
            <img src={data.user.imageUrl === "" ? "../../../../unknown-user.png" : data.user.imageUrl} alt='User-Profile'/>
            <div className='user-view-profile-data'>
                <span>Name: {data.user.fullName}</span>
                <span>Email: {data.user.emailAddress}</span>
                <span>NIC: {data.user.nic}</span>
                <span>Contact: {data.user.contact}</span>
                <span>Address: {data.user.address}</span>
                <span>Gender: {data.user.gender}</span>
                <span>Birthday: {data.user.birthday}</span>
            </div>
        </div>
      )}
    </div>
  )
}

export default UserView
