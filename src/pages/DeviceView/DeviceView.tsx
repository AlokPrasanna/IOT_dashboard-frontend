import React from 'react';
import "./deviceView.scss"
import { PageTitle } from '../../components/molecules';
import { useTheme } from '../../context/Theme/ThemeContext';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';

const DeviceView:React.FC = () => {
  const {colors} = useTheme();
  const {deviceId} = useParams();
  const {data , loading , error} = useFetch({path:`devices/one/${deviceId}`})

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
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh" }}>
            <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
            <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
          </div>
      ): !loading && error !== null ? (
          <span className='error-msg'>{error}</span>
      ):(
        <div className='device-view-body'>
          <img src='../../../unknown-device.png' alt='Device-Image' />
          <div className='device-view-data'>
            <span>ID:&nbsp; {data.device.id}</span>
            <span>Name:&nbsp; {data.device.name}</span>
            <span>Group:&nbsp; {data.device.group}</span>
            <span>Owner:&nbsp; {data.device.owner}</span>
            <span>Active State:&nbsp; {data.device.activeState === true ? "Active" : "Inactive"}</span>
            <span>ON/OFF State:&nbsp; {data.device.onState === true ? "ON" : "OFF"}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeviceView
