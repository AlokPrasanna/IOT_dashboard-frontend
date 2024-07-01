import React, {useState} from 'react';
import { PageTitle } from '../../components/molecules';
import "./devicesManager.scss"
import { Table } from '../../components/atoms';

const DevicesManager:React.FC = () => {
  const [addDevice, setAddDevice] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);

  const handleRowSelect = (rowData: Record<string, any>) => {
    setSelectedRow(rowData);
    console.log('Selected Row Data:', selectedRow);
  };

  const handleActionButtonClick = (rowData: Record<string, any>) => {
    console.log('Action Button Clicked for:', rowData);
    // Add your logic for handling the action button click here
  };
  const columns = [
    { accessKey: "deviceId", value: "Device ID" },
    { accessKey: "name", value: "Device Name" },
    { accessKey: "location", value: "Location" },
    { accessKey: "currentState", value: "Current State" },
    { accessKey: "action", value: "Change State" },
  ];

  const data = [
    {
      deviceId: 'D123',
      name: 'Temperature Sensor',
      location: 'Warehouse A',
      currentState: 'Active',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      deviceId: 'D124',
      name: 'Humidity Sensor',
      location: 'Warehouse B',
      currentState: 'Inactive',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      deviceId: 'D125',
      name: 'Motion Detector',
      location: 'Entrance',
      currentState: 'Active',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      deviceId: 'D126',
      name: 'Smoke Detector',
      location: 'Kitchen',
      currentState: 'Active',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      deviceId: 'D127',
      name: 'Light Sensor',
      location: 'Hallway',
      currentState: 'Inactive',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
  ];
  
  return (
    <div className='devices-content'>
      <div className="device-header">
        <PageTitle 
          title='Devices Manager'
          subTitle='This is the Devices Managerment Page'
        />
        {addDevice === false ? (
          <div style={{ display:'flex' , gap:"10px"}}>
          <button type='button' className='users-add-button' id='edit-user-btn'>Edit Device</button>
          <button type='button' className='users-add-button' id='delete-user-btn'>Delete Device</button>
          <button type='button' className='users-add-button'>Add New Device</button>
        </div>
        ):""}
      </div>
      {addDevice === true ? (
        <Table columns={columns} data={data} onRowSelect={handleRowSelect} onActionButtonClick={handleActionButtonClick}/>
      ): ""}
    </div>
  )
}

export default DevicesManager;
