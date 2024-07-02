import React, {useState , useRef} from 'react';
import { PageTitle } from '../../components/molecules';
import "./devicesManager.scss"
import { Table } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import { useBaseUrl } from '../../context/BaseUrl/BaseUrlContext';
import axios from 'axios';
import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';

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
  const [showEditPopup , setShowEditPopup] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {colors} = useTheme();

  const {data , loading , error} = useFetch({path:"devices/all"});

  const {baseUrl} = useBaseUrl();

  console.log(data);

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
    { accessKey: "id", value: "Device ID" },
    { accessKey: "name", value: "Device Name" },
    { accessKey: "group", value: "Group" },
    { accessKey: "owner", value: "Owner" },
    { accessKey: "onState", value: "ON / OFF" },
    { accessKey: "activeState", value: "Change State" },
  ];

  const GenerateID = () => {
    const currentDate = new Date();
    const milliseconds = currentDate.getTime().toString();
    const deviceID = milliseconds.slice(-8);
  
    return deviceID;
  };

  const formik = useFormik({
  initialValues,
  onSubmit: async(values) =>{
    if(window.confirm("Are you sure to continue?")){

      const id = GenerateID();

      const currentDate = new Date();

      // Current Date
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
  
      // Current Time
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const data = {
        id:id,
        name:values.deviceName,
        imageUrl:'',
        group:values.group,
        owner:values.owner,
        onState: false,
        activeState:false,
        dateCreated:formattedDate,
        timeCreated:formattedTime,
        dateUpdated:formattedDate,
        timeUpdated:formattedTime
      }

      const url = `${baseUrl}devices/create-new-device`;

      await axios
        .post(url , data)
        .then( res => {
          console.log(res);
          alert("Devices created successfully!");
        })
        .catch(error => {
          console.log(error);
          alert(error.response.data.error.message);
        })
    }
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

  const HandleClearButton = () => {
    formik.resetForm();
  }

  const HandelEditPopup = () => {
    setShowEditPopup(true);
  }

  const HandelCanselButton = () => {
    setAddDevice(false);
    setShowEditPopup(false);
  }
  
  return (
    <div className='devices-content'>
      <div className="device-header">
        <PageTitle 
          title='Devices Manager'
          subTitle='This is the Devices Management Page'
        />
        {addDevice === false && !loading && error === null ? (
          <div className='action-buttons'>
          <button type='button' className='device-edit' disabled={addDevice || showEditPopup} id='edit-user-btn' onClick={HandelEditPopup}>Edit Device</button>
          <button type='button' className='device-delete' disabled={addDevice || showEditPopup} id='delete-user-btn'>Delete Device</button>
          <button type='button' className='device-add' disabled={addDevice || showEditPopup} onClick={HandleAddDevicesButton}>Add New Device</button>
        </div>
        ):""}
      </div>
      {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh" }}>
            <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
            <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
          </div>
        ): !loading && error !== null ? (
          <span className='error-msg'>{error}</span>
        ): (
        addDevice === true && (
          <div >
            <div className='create-device-body'>
              <div className="device-form-header">
                <h2>Create New Device</h2>
              </div>
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
                  <div className='selection'>
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
                    </div>
                    <div className='selection'>
                      <span>Choose Group</span>
                      <select
                        id="group"
                        name="group"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.group}
                      >
                        <option value="">None</option>
                        <option value="A">Group A</option>
                        <option value="B">Group B</option>
                        <option value="C">Group C</option>
                      </select>
                    </div>
                    <div className='selection'>
                      <span>Choose Owner</span>
                      <select
                        id="owner"
                        name="owner"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.owner}
                      >
                        <option value="">None</option>
                        <option value="Owner A">Owner A</option>
                        <option value="Owner B">Owner B</option>
                        <option value="Owner C">Owner C</option>
                      </select>
                    </div>
              </form>
            </div>
            <div className='device-btn action-buttons'>
              <button type='button' className='clear-btn' onClick={HandleClearButton}>Clear</button>
              <button type='button' className='cansel-btn' onClick={HandelCanselButton} >Cansel</button>
              <button type='button' className='create-btn' onClick={formik.submitForm}>Create New Device</button>
            </div>
          </div>
      ))}
      {addDevice === false && !loading && error === null ? (
        <div className='device-table'>
          <Table 
            columns={columns} 
            data={data.devices} 
            onRowSelect={handleRowSelect} 
            onActionButtonClick={handleActionButtonClick}
          />
        </div>
      ): ""}
      {showEditPopup && !addDevice && (
        <div className='device-edit-popup'>
          <div className='edit-device-body'>
            <div className="edit-popup-header">
              <h3>Edit Device Details</h3>
            </div>
            <form>
              <div>
                <span>Change Image</span>
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
                </div>
                <div className='selection'>
                  <span>Change Device Name</span>
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
                  </div>
                  <div className='selection'>
                    <span>Change Group</span>
                    <select>
                      <option>None</option>
                      <option>Group A</option>
                      <option>Group B</option>
                      <option>Group C</option>
                    </select>
                  </div>
                  <div className='selection'>
                    <span>Change Owner</span>
                    <select>
                      <option>None</option>
                      <option>Group A</option>
                      <option>Group B</option>
                      <option>Group C</option>
                    </select>
                  </div>
                  <div className='selection'>
                    <span>Change ON / OFF State</span>
                    <select>
                      <option>None</option>
                      <option>ON</option>
                      <option>OFF</option>
                    </select>
                  </div>
                  <div className='edit-device-btn action-buttons'>
                    <button className='cansel-btn' onClick={HandelCanselButton} >Cansel</button>
                    <button className='create-btn'>Save Changes</button>
                  </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevicesManager;
