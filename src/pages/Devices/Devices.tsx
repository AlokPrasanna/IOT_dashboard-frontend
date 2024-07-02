import React, {useState} from 'react';
import './devices.scss'
import { PageTitle , DeviceCard } from '../../components/molecules';
import { useTheme } from '../../context/Theme/ThemeContext';

const data = [{
    id: '1',
    name: 'Device One',
    image: '../../../unknown-device.png',
    active: true,
    on: true,
    group: 'Group A'
  },
  {
    id: '2',
    name: 'Device Two',
    image: '../../../unknown-device.png',
    active: true,
    on: false,
    group: 'Group B'
  },
  {
    id: '3',
    name: 'Device Three',
    image: '../../../unknown-device.png',
    active: false,
    on: false,
    group: 'Group C'
  },
  
];  

const Devices:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<String>('');
  const {colors} = useTheme();

  if (colors) {
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
    document.documentElement.style.setProperty('--text-color', colors.grey[100]);
    document.documentElement.style.setProperty('--border-b-color', colors.redAccent[400]);
    document.documentElement.style.setProperty('--button-color', colors.greenAccent[400]);
    document.documentElement.style.setProperty('--hover-color', colors.blueAccent[400]);
  }

  const toggleDevice = (id: string) => {
    console.log(`Toggle device with id: ${id}`);
  };
  
  const editDevice = (id: string) => {
    console.log(`Edit device with id: ${id}`);
  };
  
  const removeDevice = (id: string) => {
    console.log(`Remove device with id: ${id}`);
  }; 

  const viewDevice = (id: string) => {
    console.log(`View device with id: ${id}`);
    window.open(`/device-view`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDevices = data.filter((device) => 
    device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='devices-content'>
      <div className='devices-header'>
        <PageTitle
          title='Your Devices'
          subTitle='This is Your Devices Page'
        />
        <input 
          type='text'
          placeholder='Search...'
          onChange={handleSearchChange}
        />
      </div>
      <div className='devices-body'>
      {filteredDevices.length > 0 && filteredDevices.map((device) => ( 
          <DeviceCard 
            key={device.id}
            device={device}
            toggleDevice={toggleDevice}
            editDevice={editDevice}
            removeDevice={removeDevice}
            viewDevice={viewDevice}
          />
        ))}
      </div>
    </div>
  )
}

export default Devices
