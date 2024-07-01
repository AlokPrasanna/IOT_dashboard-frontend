import React, {useState , useRef} from 'react';
import { PageTitle } from '../../components/molecules';
import "./devicesManager.scss"
import { Table } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';

interface FormValues {
  deviceId:string;
  deviceName: string;
  owner: string;
  group: string;
  imageUrl: string;
  onState: string;
  activeState: string;
}

const initialValues: FormValues = {
  deviceId:'',
  deviceName: '',
  owner: '',
  group: '',
  imageUrl: '',
  onState: '',
  activeState: '',
};

const DevicesManager:React.FC = () => {
  const [addDevice, setAddDevice] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {colors} = useTheme();

  if (colors) {
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.redAccent[500]);
    document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[500]);
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
  }

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
    { accessKey: "group", value: "Group" },
    { accessKey: "owner", value: "Owner" },
    { accessKey: "onState", value: "ON / OFF" },
    { accessKey: "activeState", value: "Change State" },
  ];

  const data = [{}];

  const formik = useFormik({
  initialValues,
  onSubmit: (values) =>{
    console.log(values);
  }
  })

  const HandleAddDevicesButton = () => {
    setAddDevice(true);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const HandelCanselButton = () => {
    setAddDevice(false);
  }
  
  return (
    <div className='devices-content'>
      <div className="device-header">
        <PageTitle 
          title='Devices Manager'
          subTitle='This is the Devices Managerment Page'
        />
        {addDevice === false ? (
          <div className='action-buttons'>
          <button type='button' className='device-edit' id='edit-user-btn'>Edit Device</button>
          <button type='button' className='device-delete' id='delete-user-btn'>Delete Device</button>
          <button type='button' className='device-add' onClick={HandleAddDevicesButton}>Add New Device</button>
        </div>
        ):""}
      </div>
      {addDevice === false ? (
        <Table columns={columns} data={data} onRowSelect={handleRowSelect} onActionButtonClick={handleActionButtonClick}/>
      ): ""}
      {addDevice === true && (
        <div >
          <div className='create-device-body'>
            <span>Create New Device</span>
            <form>
              <span>Add Image</span>
              <input
                type='file'
                className='add-image-content-device placeholder'
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {imageFile && (
                  <div className='image-buttons'>
                    <button className='delete-button' type='button' onClick={handleRemoveImage}>Remove Image</button>
                    <button className='image-button save-button' type='button'>Save Image</button>
                  </div>
                )}
                <span>Device Name</span>
              <input
                  type="text"
                  id="deviceName"
                  name="deviceName"
                  placeholder="Device Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.deviceName}
                  className="device-input placeholder"
                />
                <div className='selection'>
                  <span>Choose Group</span>
                  <select>
                    <option>None</option>
                    <option>Group A</option>
                    <option>Group B</option>
                    <option>Group C</option>
                  </select>
                </div>
                <div className='selection'>
                  <span>Choose Owner</span>
                  <select>
                    <option>None</option>
                    <option>Group A</option>
                    <option>Group B</option>
                    <option>Group C</option>
                  </select>
                </div>
            </form>
          </div>
          <div className='device-btn action-buttons'>
            <button className='clear-btn'>Clear</button>
            <button className='cansel-btn' onClick={HandelCanselButton} >Cansel</button>
            <button className='create-btn'>Create New Device</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevicesManager;
