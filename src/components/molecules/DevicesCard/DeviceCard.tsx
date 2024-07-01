import React from 'react';
import "./deviceCard.scss"
import { useTheme } from '../../../context/Theme/ThemeContext';

interface Device {
    id: string;
    name: string;
    image:string;
    active: boolean;
    on: boolean;
    group: string;
}

interface DeviceCardProps {
    device: Device;
    toggleDevice: (id: string) => void;
    editDevice: (id: string) => void;
    removeDevice: (id: string) => void;
    viewDevice: (id: string) => void;
}

const DeviceCard:React.FC<DeviceCardProps> = ({device , toggleDevice , editDevice , removeDevice , viewDevice}) => {
    const {colors} = useTheme();

    if(colors){
        document.documentElement.style.setProperty("--bg-color" , colors.primary[400]);
        document.documentElement.style.setProperty("--text-color" , colors.grey[100]);
        document.documentElement.style.setProperty("--view-color" , colors.greenAccent[400]);
        document.documentElement.style.setProperty("--edit-color" , colors.blueAccent[400]);
        document.documentElement.style.setProperty("--remove-color" , colors.redAccent[400]);
    }
  return (
    <div className="device-card">
     <div className='device-card-content'>
        <img src={device.image} />
        <div className='device-card-body'>
            <span>ID: {device.id}</span>
            <span>Name: {device.name}</span>
            <span>Group: {device.group}</span>
            <span>Actice State: {device.active ? "Active" : "Inactive"}</span>
            <span>ON/OFF State: {device.on ? "ON" : "OFF"}</span>
            <input type="checkbox" className='device-card-checkbox' checked={device.on} onChange={() => toggleDevice(device.id)} />
        </div>
        <div className='device-card-actions'>
            <button id='view' onClick={() => viewDevice(device.id)}>View</button>
            <button id='edit' onClick={() => editDevice(device.id)}>Edit</button>
            <button id='remove' onClick={() => removeDevice(device.id)}>Remove</button> 
        </div>
     </div>
  </div>
  )
}

export default DeviceCard
