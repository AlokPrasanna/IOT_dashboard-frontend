import React from 'react';
import "./userView.scss"
import { PageTitle } from '../../components/molecules';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';
import { useTheme } from '../../context/Theme/ThemeContext';

const UserView:React.FC = () => {
    const {userId} = useParams();
    const { loading , error} = useFetch({path:`users/one/${userId}`});
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
      ): !loading && error === null && (
        <div className='user-view-profile-body'>
            <img src="../../../../unknown-user.png" alt='User-Profile'/>
            <div className='user-view-profile-data'>
                <span>Name: John Doe</span>
                <span>Email: john.doe@example.com</span>
                <span>NIC: 123456789V</span>
                <span>Contact: +1234567890</span>
                <span>Address: 1234 Elm Street, Springfield, USA</span>
                <span>Gender: Male</span>
                <span>User Type: Admin</span>
                <span>Birthday: 1990-01-01</span>
            </div>
        </div>
      )}
    </div>
  )
}

export default UserView
