import React, { useState } from 'react';
import { PageTitle } from '../../components/molecules';
import "./users.scss";
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '../../components/atoms';

interface FormValues {
  fullName: string;
  nic: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  birthday: string;
  userType: string;
  sendEmail: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  fullName: '',
  nic: '',
  email: '',
  phoneNumber: '',
  address: '',
  gender: 'Male',
  birthday: '',
  userType: 'Member',
  sendEmail: 'No',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  nic: Yup.string().required('NIC is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().required('Contact Number is required'),
  address: Yup.string().required('Address is required'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.string().required('Birthday is required'),
  userType: Yup.string().required('User Type is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Team: React.FC = () => {
  const [addUser, setAddUser] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { colors } = useTheme();

  if (colors) {
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.blueAccent[400]);
  }

  const handleAddNewUserButton = () => {
    setAddUser(!addUser);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCancelButton = () => {
    setAddUser(false);
  }

  const handleClearButton = () => {
    formik.resetForm();
  }

  return (
    <div className='users-content'>
      <div className='users-header'>
        <PageTitle 
          title='Users'
          subTitle='This is the Users Page'
        />
        <button type='button' className='users-add-button' onClick={handleAddNewUserButton}>Add New User</button>
      </div>
      {addUser === true ? (
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
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Contact Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  className="full-width"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.phoneNumber}</div>
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
                {formik.touched.address && formik.errors.address && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.address}</div>
                )}
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
                {formik.touched.birthday && formik.errors.birthday && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.birthday}</div>
                )}
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
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
                {formik.touched.userType && formik.errors.userType && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.userType}</div>
                )}
              </div>
              <div className='password'>
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
                <div className='icon'>
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
                  onclick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' , color: "black" ,  width:"25px" , background:"none" , border:"none" }}
                />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.password}</div>
                )}
              </div>
              <div className='password'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="ReEnter Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="full-width"
                />
                <div className='icon'>
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
                  onclick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer' , color: "black" ,  width:"25px" , background:"none" , border:"none" }}
                />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.confirmPassword}</div>
                )}
              </div>
            </div>
            <div className="submit-button">
              <button type="button" id='cancel-btn' onClick={handleCancelButton}>Cancel</button>
              <button type="button" id='clear-btn' onClick={handleClearButton}>Clear</button>
              <button type="submit">Create New User</button>
            </div>
          </form>
        </div>
      ) : "Non"}
    </div>
  )
}

export default Team;
