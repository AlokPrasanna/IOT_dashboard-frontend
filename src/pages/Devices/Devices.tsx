import React, {useState} from 'react';
import './devices.scss'
import { PageTitle , DeviceCard } from '../../components/molecules';
import { useTheme } from '../../context/Theme/ThemeContext';
//import useFetch from '../../hooks/UseFetch';
//import ReactLoading from 'react-loading'; 
import { useNavigate } from 'react-router-dom';

const sampleData = [
  {
    "_id": "60d21b4667d0d8992e610c88",
    "id": "1625088888",
    "name": "Device A",
    "group": "Group A",
    "owner": "Owner A",
    "imageUrl": "",
    "onState": true,
    "activeState": true,
    "dateCreated": "2023-06-30",
    "timeCreated": "10:30:45",
    "dateUpdated": "2023-07-01",
    "timeUpdated": "14:20:30"
  },
  {
    "_id": "60d21b4667d0d8992e610c89",
    "id": "1625088899",
    "name": "Device B",
    "group": "Group B",
    "owner": "Owner B",
    "imageUrl": "",
    "onState": false,
    "activeState": false,
    "dateCreated": "2023-06-29",
    "timeCreated": "09:15:30",
    "dateUpdated": "2023-07-01",
    "timeUpdated": "15:45:15"
  },
  {
    "_id": "60d21b4667d0d8992e610c90",
    "id": "1625088900",
    "name": "Device C",
    "group": "Group C",
    "owner": "Owner C",
    "imageUrl": "",
    "onState": true,
    "activeState": false,
    "dateCreated": "2023-06-28",
    "timeCreated": "08:45:20",
    "dateUpdated": "2023-07-01",
    "timeUpdated": "13:10:10"
  }
]

const Devices:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<String>('');
  //const {data , loading , error} = useFetch({path:"devices/all"})
  const {colors} = useTheme();
  const navigate = useNavigate();

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
    navigate(`/device-view/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDevices = sampleData.filter((device:any) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    const matchesActive = lowerCaseSearchTerm.startsWith('ac' || 'act') && device.activeState;
    const matchesInactive = lowerCaseSearchTerm.startsWith('in'||'ina'|| 'inac'||'inact') && !device.activeState;
    const matchesOn = lowerCaseSearchTerm.startsWith('on') && device.onState;
    const matchesOff = lowerCaseSearchTerm.startsWith('of') && !device.onState;

    return (
      device.id.toLowerCase().includes(lowerCaseSearchTerm) ||
      device.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      device.group.toLowerCase().includes(lowerCaseSearchTerm) ||
      matchesActive ||
      matchesInactive ||
      matchesOn ||
      matchesOff
    );
  });
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
      {/* {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh" }}>
          <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
          <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
        </div>
      ) : !loading && error !== null ? (
          <span className='error-msg'>{error}</span>
      ) : !loading && error === null && data !== null &&( */}
      <div className='devices-body'>
      {filteredDevices.length > 0 ? filteredDevices.map((device:any) => ( 
          <DeviceCard 
            key={device.id}
            device={device}
            toggleDevice={toggleDevice}
            editDevice={editDevice}
            removeDevice={removeDevice}
            viewDevice={viewDevice}
          />
        )):(
          <span className='not-devices-msg'>Not Devices Found!</span>
        )}
      </div>
      {/* )} */}
    </div>
  )
}

export default Devices
