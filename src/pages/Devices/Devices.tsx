import React from 'react';
import './devices.scss'
import { PageTitle , DeviceCard } from '../../components/molecules';

const data = [{
    id: '1',
    name: 'Device One',
    image: '../../../unknown-device.png',
    active: true,
    on: true,
    group: 'Group A'
  },
  {
    id: '1',
    name: 'Device One',
    image: '../../../unknown-device.png',
    active: true,
    on: false,
    group: 'Group A'
  },
  {
    id: '1',
    name: 'Device One',
    image: '../../../unknown-device.png',
    active: false,
    on: false,
    group: 'Group A'
  }
];  

  const toggleDevice = (id: string) => {
    console.log(`Toggle device with id: ${id}`);
  };
  
  const editDevice = (id: string) => {
    console.log(`Edit device with id: ${id}`);
  };
  
  const removeDevice = (id: string) => {
    console.log(`Remove device with id: ${id}`);
  };  

const Devices:React.FC = () => {
  
  return (
    <div className='devices-content'>
      <PageTitle
        title='Your Devices'
        subTitle='This is Your Devices Page'
      />
      <div className='devices-body'>
        {data.length > 0 && data.map((device) => ( 
          <DeviceCard 
            device={device}
            toggleDevice={toggleDevice}
            editDevice={editDevice}
            removeDevice={removeDevice}
          />
        ))}
      </div>
    </div>
  )
}

export default Devices
