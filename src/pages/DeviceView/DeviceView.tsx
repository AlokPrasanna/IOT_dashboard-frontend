import React from 'react';
import "./deviceView.scss"
import { PageTitle } from '../../components/molecules';
import { useTheme } from '../../context/Theme/ThemeContext';

const DeviceView:React.FC = () => {
  const {colors} = useTheme();

  if(colors){
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.redAccent[500]);
    document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[500]);
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
  }
  return (
    <div className='device-view-content'>
      <PageTitle 
        title='Device View'
        subTitle='This is Device Details View Page.'
      />
      <div className='device-view-body'>
        <img src='../../../unknown-device.png' alt='Device-Image' />
        <div className='device-view-data'>
          <span>ID:&nbsp; 100568 </span>
          <span>Name:&nbsp; Device One</span>
          <span>Group:&nbsp; A</span>
          <span>Owner:&nbsp; Jone Dio</span>
          <span>Active State:&nbsp; Active</span>
          <span>ON/OFF State:&nbsp; OFF</span>
        </div>
      </div>
    </div>
  )
}

export default DeviceView
