import React from 'react';
import { Image , Icon } from '../../components/atoms';
import { useTheme } from '../../context/Theme/ThemeContext';
import "./login.scss";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues  {
  email:string;
  password:string;
}

const initialValues: FormValues = {
  email:'',
  password:''
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format'),
})

const Login:React.FC = () => {
  const {colors , toggleTheme , theme} = useTheme();

  if(colors){
    document.documentElement.style.setProperty("--bg-color" , colors.primary[400]);
    document.documentElement.style.setProperty("--text-color" , colors.grey[100]);
    document.documentElement.style.setProperty("--focus-color" , colors.greenAccent[500]);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
      <div className="login-content">
        <div className='login-logo'>
          <Image 
              src='../../logo.png'
              alt='Logo'
              style={{width:"45px" ,display:"flex" , alignItems:"center" , justifyContent:"center"}}
          />
        </div>
        <div className='mode-icon'>
          {theme === "dark" ? (
                <Icon
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg> 
                    }
                    onclick={toggleTheme}
                    style={{ cursor: 'pointer' , color:'white', width:"20px" , background:"none" , border:"none"}}
                />
            ) : (
                <Icon
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    }
                    onclick={toggleTheme}
                    style={{ cursor: 'pointer',  color:'black', width:"20px" , background:"none" , border:"none" }}
                />
            )}
        </div>
        <div className="login-area">
          <div className="login-title">
            <p className='login-title-text'>Login Page</p>
          </div>
          <div className="login-form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <label htmlFor="name">Email Address</label>
                  <input
                     type="text"
                     id="email"
                     name="email"
                     placeholder="Enter Email Address"
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.email}
                     className="login-input"
                  />
                  {formik.errors.email && (
                    <div style={{color: colors.redAccent[500], fontSize: "12px", fontWeight: "normal"}}>{formik.errors.email}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="name">Password</label>
                  <input 
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Enter Pasowrd"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="login-input"
                  />
                </div>
              </div>
              <div className='login-btn'>
                <button type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login
