import React from 'react';
import "./deviceCard.scss"
import { useTheme } from '../../../context/Theme/ThemeContext';

interface Device {
    id: string;
    name: string;
    imageUrl:string;
    activeState: boolean;
    onState: boolean;
    group: string;
    owner:string;
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

    console.log(device);

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
        <img src={device.imageUrl !== '' ? device.imageUrl : "../../../unknown-device.png"} />
        <div className='device-card-body'>
            <span>ID: {device.id}</span>
            <span>Name: {device.name}</span>
            <span>Group: {device.group}</span>
            <span>Owner: {device.owner}</span>
            <span>Actice State: {device.activeState ? "Active" : "Inactive"}</span>
            <span>ON/OFF State: {device.onState ? "ON" : "OFF"}</span>
            <input type="checkbox" className='device-card-checkbox' checked={device.onState} onChange={() => toggleDevice(device.id)} />
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
