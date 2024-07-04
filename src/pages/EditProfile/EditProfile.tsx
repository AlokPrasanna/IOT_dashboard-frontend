import React, { useState, useRef, useEffect } from 'react';
import { PageTitle } from '../../components/molecules';
import './editProfile.scss';
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '../../components/atoms';
//import useFetch from '../../hooks/UseFetch';
import ReactLoading from 'react-loading';
// import { useBaseUrl } from '../../context/BaseUrl/BaseUrlContext';
// import axios from 'axios';

const validationSchema = Yup.object({
  emailAddress: Yup.string().email('Invalid email format'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match with New Password'),
});

interface EditeProps {
  isCollapsed: boolean;
}

const EditProfile: React.FC<EditeProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  //const userId = localStorage.getItem('userId');
  const [imageFile, setImageFile] = useState<File | null>(null);
  //const { data, loading, error } = useFetch({ path: `users/one/${userId}` });
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const {baseUrl} = useBaseUrl();
  const loading = false;
  const error = null;

  const { colors } = useTheme();

  if (colors) {
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.redAccent[400]);
    document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[400]);
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
  }

  const formik = useFormik({
    initialValues: {
      fullName: '',
      nic: '',
      emailAddress: '',
      contact: '',
      address: '',
      gender: '',
      birthday: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword:'',
      dateCreated:'',
      timeCreated:''
    },
    validationSchema,
    onSubmit: async(values) => {
      if (values.newPassword && !values.currentPassword) {
        formik.setErrors({
          currentPassword: 'Current password is required.'
        });
      }
      if(window.confirm("Are you sure to save changes?")){
        alert("User details updated successfully!");
        // const currentDate = new Date();

        // // Current Date
        // const year = currentDate.getFullYear();
        // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        // const day = String(currentDate.getDate()).padStart(2, '0');
        // const formattedDate = `${year}-${month}-${day}`;
    
        // // Current Time
        // const hours = String(currentDate.getHours()).padStart(2, '0');
        // const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        // const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        // const formattedTime = `${hours}:${minutes}:${seconds}`;

        // const data = {
        //   fullName:values.fullName,
        //   emailAddress:values.emailAddress,
        //   imageUrl:'',
        //   nic:values.nic,
        //   contact:values.contact,
        //   address:values.address,
        //   birthday:values.birthday,
        //   gender:values.gender,
        //   dateCreated:values.dateCreated,
        //   timeCreated:values.timeCreated,
        //   dateUpdated:formattedDate,
        //   timeUpdated:formattedTime
        // }
        // const url = `${baseUrl}users/update/${userId}`
        // await axios
        //   .put(url , data)
        //   .then( res => {
        //     console.log(res);
        //     alert("User details updated successfully!");
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     alert(error.response.data.error.message);
        //   })
      }
    },
  });

  // useEffect(() => {
  //   if (data && data.user) {
  //     formik.setValues({
  //       fullName: data.user.fullName || '',
  //       nic: data.user.nic || '',
  //       emailAddress: data.user.emailAddress || '',
  //       contact: data.user.contact || '',
  //       address: data.user.address || '',
  //       gender: data.user.gender || '',
  //       birthday: data.user.birthday || '',
  //       dateCreated: data.user.dateCreated,
  //       timeCreated: data.user.timeCreated,
  //       currentPassword: '',
  //       newPassword: '',
  //       confirmPassword:''
  //     });
  //   }
  // }, [data]);

  const handleClearButton = () => {
    formik.resetForm();
  };

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
  return (
    <div className='edit-profile-content'>
       <PageTitle 
        title='Edite Profile Details'
        subTitle=''
      />
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'50vh'}}>
          <span style={{ color: colors.grey[100], padding: '10px' }}>Loading...</span>
          <ReactLoading type="spin" color={colors.blueAccent[400]} height={50} width={50} />
        </div>
      ) : !loading && error !== null ?(
        <span>{error}</span>
      ):(
        <div>
      <div className='edit-form'>
      <form onSubmit={formik.handleSubmit}>
      <div className='add-image'>
      <span className='personal-header'>Add Image</span>
        {/* <span className='personal-header'>{data?.user?.imageUrl === "" || undefined ? "Add Image" : "Change Image"}</span> */}
        <div>
          <input
            type='file'
            className='add-image-content placeholder'
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
      </div>
      <span className='personal-header'>Personal Details</span>
            <div className="form-grid-edit">
              <div className='edit-input-content'>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  className="edit-input placeholder"
                />
              </div>
              <div className='edit-input-content'>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Email Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.emailAddress}
                  className="edit-input placeholder"
                />
                {formik.touched.emailAddress && formik.errors.emailAddress && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.emailAddress}</div>
                )}
              </div>
              <div className='edit-input-content'>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contact}
                  className="edit-input placeholder"
                />
              </div>
              <div className='edit-input-content'>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  placeholder="NIC Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nic}
                  className="edit-input placeholder"
                />
              </div>
              <div className='edit-input-content'>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="edit-input placeholder"
                />
              </div>
              <div className='edit-input-content'>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                  className="edit-input placeholder"
                />
              </div>
              <div className='edit-input-content'>
                <select
                  id="gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  className="edit-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className='auth'>
              <span className='auth-header'>Authentication Details</span>
              <div className='auth-content'>
              <div className='edit-password edit-input-content' style={{position:"relative"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="edit-password"
                  name="currentPassword"
                  placeholder="Current Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.currentPassword}
                  className="edit-input placeholder"
                />
                <Icon 
                  icon={
                    showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )
                  }
                  onclick={(event) => {
                    event.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  style={{ cursor: 'pointer' , backgroundColor:"none", color: "black" ,  width:"25px" , background:"none" , border:"none",position:"absolute" , right:"5px", top:"55%", transform:"translateY(-50%)"}}
                />
                {formik.touched.currentPassword && formik.errors.currentPassword && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.currentPassword}</div>
                )}
              </div>
              <div className='edit-password edit-input-content' style={{position:"relative"}}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="edit-confirmPassword"
                  name="newPassword"
                  placeholder="New Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  className="edit-input placeholder"
                />
                <Icon 
                  icon={
                    showNewPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )
                  }
                  onclick={(event) => {
                    event.preventDefault();
                    setShowNewPassword(!showNewPassword)
                  }}
                  style={{ cursor: 'pointer' , backgroundColor:"none", color: "black" ,  width:"25px" , background:"none" , border:"none",position:"absolute" , right:"5px", top:"55%", transform:"translateY(-50%)"}}
                />
              </div>
              <div className='edit-password edit-input-content' style={{position:"relative"}}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="edit-confirmPassword"
                  name="confirmPassword"
                  placeholder="Re Enter New Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="edit-input placeholder"
                />
                <Icon 
                  icon={
                    showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )
                  }
                  onclick={(event) => {
                    event.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword)
                  }}
                  style={{ cursor: 'pointer' , backgroundColor:"none", color: "black" ,  width:"25px" , background:"none" , border:"none",position:"absolute" , right:"5px", top:"55%", transform:"translateY(-50%)"}}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.confirmPassword}</div>
                )}
              </div>
              </div>
            </div>
          </form>
      </div>
        <div className="submit-button-edit">
        <button type="button" className='save-btn' id='clear-btn' onClick={handleClearButton}>Clear</button>
        <button type='button' onClick={formik.submitForm} className='save-btn'>Save Changes</button>
      </div>
      </div>
      )}
    </div>
  )
}

export default EditProfile
