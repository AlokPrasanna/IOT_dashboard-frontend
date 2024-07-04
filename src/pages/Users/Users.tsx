import React, { useState , useEffect } from 'react';
import { PageTitle  } from '../../components/molecules';
import "./users.scss";
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Table } from '../../components/atoms';
//import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';
// import axios from 'axios';
// import { useBaseUrl } from '../../context/BaseUrl/BaseUrlContext';
import { useNavigate } from 'react-router-dom';


interface FormValues {
  fullName: string;
  nic: string;
  email: string;
  contact: string;
  address: string;
  gender: string;
  birthday: string;
  imageUrl:string;
  userType: string;
  sendEmail: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  fullName: '',
  nic: '',
  email: '',
  contact: '',
  address: '',
  gender: 'Male',
  birthday: '',
  imageUrl:'',
  userType: 'Member',
  sendEmail: 'No',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  nic: Yup.string().required('NIC is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  contact: Yup.string().required('Contact Number is required'),
  address: Yup.string().required('Address is required'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.string().required('Birthday is required'),
  userType: Yup.string().required('User Type is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface UsersProps {
  isCollapsed: boolean
}

const Users: React.FC<UsersProps> = ({isCollapsed}) => {
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  //const { loading , error} = useFetch({path:"users/all", trigger:fetchTrigger});
  const [addUser, setAddUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [showEditPopup , setShowEditPopup] = useState<boolean>(false);
  const navigate  = useNavigate();
  // const {baseUrl} = useBaseUrl();
  const { colors } = useTheme();

  const sampleData = [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "fullName": "John Doe",
      "nic": "123456789V",
      "emailAddress": "john.doe@example.com",
      "contact": "+1234567890",
      "address": "1234 Elm Street, Springfield, USA",
      "gender": "Male",
      "birthday": "1990-01-01",
      "imageUrl": "",
      "userType": "Customer",
      "sendEmailStatus": "Yes",
      "password": "hashed_password_here",
      "dateCreated": "2023-06-30",
      "timeCreated": "10:30:45",
      "dateUpdated": "2023-07-01",
      "timeUpdated": "14:20:30"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "fullName": "Jane Smith",
      "nic": "987654321V",
      "emailAddress": "jane.smith@example.com",
      "contact": "+0987654321",
      "address": "5678 Oak Street, Metropolis, USA",
      "gender": "Female",
      "birthday": "1985-02-20",
      "imageUrl": "",
      "userType": "Moderator",
      "sendEmailStatus": "No",
      "password": "hashed_password_here",
      "dateCreated": "2023-06-29",
      "timeCreated": "09:15:30",
      "dateUpdated": "2023-07-01",
      "timeUpdated": "15:45:15"
    },
    {
      "_id": "60d21b4667d0d8992e610c87",
      "fullName": "Alice Johnson",
      "nic": "456789123V",
      "emailAddress": "alice.johnson@example.com",
      "contact": "+1239876540",
      "address": "910 Maple Avenue, Gotham, USA",
      "gender": "Female",
      "birthday": "1995-07-15",
      "imageUrl": "",
      "userType": "Admin",
      "sendEmailStatus": "Yes",
      "password": "hashed_password_here",
      "dateCreated": "2023-06-28",
      "timeCreated": "08:45:20",
      "dateUpdated": "2023-07-01",
      "timeUpdated": "13:10:10"
    }
  ]

  const loading = false;
  const error = null;

  const handleRowSelect = (rowData: Record<string, any>) => {
    setSelectedRow(rowData);
    console.log('Selected Row Data:', selectedRow);
  };

  useEffect(() => {
    if (selectedRow !== null) {
        console.log('Selected Row Data:', selectedRow);
    }
}, [selectedRow]);

  if (colors) {
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.redAccent[500]);
    document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[500]);
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
  }

  if(isCollapsed){
    document.documentElement.style.setProperty('--icon-transform', "730px");
  }else{
    document.documentElement.style.setProperty('--icon-transform', "645px");
  }

  console.log("error " , error);
  const columns = [
    { accessKey: "fullName", value: "Name" },
    { accessKey: "nic", value: "NIC No" },
    { accessKey: "emailAddress", value: "Email" },
    { accessKey: "contact", value: "Contact No." },
    { accessKey: "address", value: "Address" },
    { accessKey: "gender", value: "Gender" },
    { accessKey: "birthday", value: "Birthday" },
    { accessKey: "userType", value: "User Type" },
    { accessKey: "sendEmailStatus", value: "Send Email" },
  ];

  const handleAddNewUserButton = () => {
    setAddUser(!addUser);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values) => {

      if(window.confirm("Are you sure to continue?")){
        console.log(values)
        alert("User created successfully!");
      //   const currentDate = new Date();

      //   // Current Date
      //   const year = currentDate.getFullYear();
      //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      //   const day = String(currentDate.getDate()).padStart(2, '0');
      //   const formattedDate = `${year}-${month}-${day}`;
    
      //   // Current Time
      //   const hours = String(currentDate.getHours()).padStart(2, '0');
      //   const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      //   const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      //   const formattedTime = `${hours}:${minutes}:${seconds}`;

      //   const data = {
      //     fullName:values.fullName,
      //     emailAddress:values.email,
      //     address:values.address,
      //     imageUrl:values.imageUrl,
      //     contact:values.contact,
      //     nic:values.nic,
      //     gender:values.gender,
      //     birthday:values.birthday,
      //     userType:values.userType,
      //     sendEmailStatus:values.sendEmail,
      //     password:values.password,
      //     dateCreated:formattedDate,
      //     timeCreated:formattedTime,
      //     dateUpdated:formattedDate,
      //     timeUpdated:formattedTime
      //   }
      //   const url = `${baseUrl}users/create-new-user`;
      //   //console.log(url);
      //   await axios
      //     .post(url, data)
      //     .then( res => {
      //       console.log(res);
      //       alert("User created successfully!");
      //       setFetchTrigger(!fetchTrigger);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       alert(error.response.data.error.message);
      //     })
       };
    }
  });

  const handleCancelButton = () => {
    setAddUser(false);
    setShowEditPopup(false);
    //setSelectedRow(null);
  }

  const handleClearButton = () => {
    formik.resetForm();
  }

  const handleSaveButton = () => {
    console.log(selectedRow);
    setShowEditPopup(false);
  }

  const HandleUserViewButton = () => {
    if(selectedRow === null){
      alert("Please select row before click View button");
      return;
    }else{
      navigate(`/user-view/${selectedRow._id}`)
    }
  }

  const handleEditeButton = () => {
    if(selectedRow === null){
      alert("Please select row before click Edit button");
      return;
    }
    setShowEditPopup(true);
  }

  const handelDeleteUserButton = async() => {
    if(selectedRow === null){
      alert("Please select row before click Delete button");
      return;
    }

    if(window.confirm('Are you sure to delete selected user?')){
      alert("User delete successfully!");
      // const url = `${baseUrl}users/delete/${selectedRow._id}`;
      // await axios
      //   .delete(url)
      //   .then( res => {
      //     console.log(res);
      //     alert("User delete successfully!");
      //     setFetchTrigger(!fetchTrigger);
      //     setSelectedRow(null);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     alert(error.response.data.error.message);
      //   })
    }

  }

  return (
    <div className='users-content'>
      <div className='users-header'>
        <PageTitle 
          title='Users'
          subTitle='This is the Users Page'
        />
        {!loading && addUser === false ? (
          <div style={{ display:'flex' , gap:"10px"}}>
            <button type='button' className='users-add-button' disabled={addUser || showEditPopup} id='view-btn' onClick={HandleUserViewButton}>View</button>
            <button type='button' className='users-add-button' disabled={addUser || showEditPopup} id='edit-user-btn' onClick={handleEditeButton}>Edit</button>
            <button type='button' className='users-add-button' disabled={addUser || showEditPopup} id='delete-user-btn' onClick={handelDeleteUserButton}>Delete</button>
            <button type='button' className='users-add-button' disabled={addUser || showEditPopup} onClick={handleAddNewUserButton}>Add New</button>
          </div>
        ): (
          // <button type='button' className='users-add-button' onClick={handleAddNewUserButton}>Add New User</button>
          ""
        )}
        
      </div>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh" }}>
          <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
          <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
        </div>
      ) : !loading && error !== null ? (
        <span className='error-msg'>{error}</span>
      ):(
        addUser === true ? (
        <div className="form-container">
          <div className="form-header">
            <h2>Create a New User Profile</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-grid">
              <div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  className="full-width"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.fullName}</div>
                )}
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="full-width"
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.email}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contact}
                  className="full-width"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.contact}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  placeholder="NIC Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nic}
                  className="full-width"
                />
                {formik.touched.nic && formik.errors.nic && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.nic}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="full-width"
                />
                {/* {formik.touched.address && formik.errors.address && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.address}</div>
                )} */}
              </div>
              <div>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                  className="full-width"
                />
                {/* {formik.touched.birthday && formik.errors.birthday && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.birthday}</div>
                )} */}
              </div>
              <div>
                <select
                  id="gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  className="full-width"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.gender}</div>
                )}
              </div>
              <div>
                <select
                  id="userType"
                  name="userType"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.userType}
                  className="full-width"
                >
                  <option value="Customer">Customer</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
                {formik.touched.userType && formik.errors.userType && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.userType}</div>
                )}
              </div>
              <div className='password' style={{position:"relative"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="full-width"
                />

                <button 
                  className='showPassword-icon' 
                  onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }} >
                  {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.password}</div>
                )}
              </div>
              <div className='password' style={{position:"relative"}}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re Enter Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="full-width"
                />
                <button 
                  className='showPassword-icon' 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}>
                  {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                </button>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.confirmPassword}</div>
                )}
              </div>
              <div>
                <span className='auth-header'>Send Emails</span>
                <select
                  id="sendEmail"
                  name="sendEmail"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sendEmail}
                  className="full-width"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="submit-button">
              <button type="button" id='cansel-btn' onClick={handleCancelButton}>Cancel</button>
              <button type="button" id='clear-btn' onClick={handleClearButton}>Clear</button>
              <button type="button" onClick={formik.submitForm}>Create New User</button>
            </div>
          </form>
        </div>
      ) : (
        <div className='user-table'>
          { error === null ? (
            <Table columns={columns} data={sampleData} onRowSelect={handleRowSelect}/>
          ): <p>{error}</p>}
        </div>
      ))}
      {showEditPopup && !addUser && (
        <div className='edit-user-popup'>
          <div className="popup-header">
            <h3>Edit User Details</h3>
          </div>
          <div className="popup-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-grid">
              <div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, fullName: e.target.value }))}
                  value={selectedRow?.fullName}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Email Address"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, emailAddress: e.target.value }))}
                  value={selectedRow?.emailAddress}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact Number"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, contact: e.target.value }))}
                  value={selectedRow?.contact}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  placeholder="NIC Number"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, nic: e.target.value }))}
                  value={selectedRow?.nic}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, address: e.target.value }))}
                  value={selectedRow?.address}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, birthday: e.target.value }))}
                  value={selectedRow?.birthday}
                  className="full-width"
                />
              </div>
              <div>
                <select
                  id="gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, gender: e.target.value }))}
                  value={selectedRow?.gender}
                  className="full-width"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <select
                  id="userType"
                  name="userType"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, userType: e.target.value }))}
                  value={selectedRow?.userType}
                  className="full-width"
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
              </div>
              <div>
                <span className='auth-header'>Send Emails</span>
                <select
                  id="sendEmail"
                  name="sendEmail"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, sendEmailStatus: e.target.value }))}
                  value={selectedRow?.sendEmailStatus}
                  className="full-width"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="submit-button">
              <button type="button" id='cansel-btn' onClick={handleCancelButton}>Cancel</button>
              <button type="button" onClick={handleSaveButton}>Save</button>
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users;
