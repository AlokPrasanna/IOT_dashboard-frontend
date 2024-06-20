import React, { useState } from 'react';
import { PageTitle  } from '../../components/molecules';
import "./users.scss";
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon , Table } from '../../components/atoms';

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

interface UsersProps {
  isCollapsed: boolean
}

const Users: React.FC<UsersProps> = ({isCollapsed}) => {
  const [addUser, setAddUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [showEditPopup , setShowEditPopup] = useState<boolean>(false);

  const { colors } = useTheme();

  const handleRowSelect = (rowData: Record<string, any>) => {
    setSelectedRow(rowData);
    //console.log('Selected Row Data:', selectedRow?.fullName);
  };

  const handleEditeButton = () => {
    if(selectedRow === null){
      alert("Please select row before click 'Edite User' button");
      return;
    }
    setShowEditPopup(true);
  }

  if (colors) {
    document.documentElement.style.setProperty('--btn-bg', colors.greenAccent[500]);
    document.documentElement.style.setProperty('--text', colors.grey[100]);
    document.documentElement.style.setProperty('--btn-clear', colors.redAccent[400]);
    document.documentElement.style.setProperty('--edit-btn', colors.blueAccent[400]);
    document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
  }

  if(isCollapsed){
    document.documentElement.style.setProperty('--icon-transform', "730px");
  }else{
    document.documentElement.style.setProperty('--icon-transform', "645px");
  }

  const columns = [
    { accessKey: "fullName", value: "Name" },
    { accessKey: "nic", value: "NIC No" },
    { accessKey: "email", value: "Email" },
    { accessKey: "phoneNumber", value: "Contact No." },
    { accessKey: "address", value: "Address" },
    { accessKey: "gender", value: "Gender" },
    { accessKey: "birthday", value: "Birthday" },
    { accessKey: "userType", value: "User Type" },
    { accessKey: "sendEmail", value: "Send Email Status" },
  ];

  let data = [
    {
        "fullName": "Christopher Griffith",
        "nic": "697-25-3860",
        "email": "reginaldmartinez@smith.info",
        "phoneNumber": "+1-078-755-7228x67651",
        "address": "742 Shepherd Green Apt. 234\nNorth Teresa, ID 14298",
        "gender": "Female",
        "birthday": "2016-06-16",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "8I(6RFQcOd",
        "confirmPassword": "+4HkNj_xh*"
    },
    {
        "fullName": "Peter Rivera",
        "nic": "818-53-6957",
        "email": "aaronconway@gmail.com",
        "phoneNumber": "(532)054-2317x29129",
        "address": "52611 Raymond Springs Apt. 283\nNorth Amyton, WY 61171",
        "gender": "Male",
        "birthday": "1952-04-13",
        "userType": "Admin",
        "sendEmail": "Yes",
        "password": "@7%iJGFCsp",
        "confirmPassword": "MLG*6WZywW"
    },
    {
        "fullName": "Troy Jones",
        "nic": "857-58-9484",
        "email": "shannonatkinson@hotmail.com",
        "phoneNumber": "(286)960-3684x3297",
        "address": "08278 White Avenue\nMeganmouth, TN 13729",
        "gender": "Female",
        "birthday": "1968-10-05",
        "userType": "Member",
        "sendEmail": "Yes",
        "password": "#587EJtQ&c",
        "confirmPassword": "@a(6KNt7a("
    },
    {
        "fullName": "Erica Miller",
        "nic": "556-13-4178",
        "email": "mariahjones@gmail.com",
        "phoneNumber": "145-114-8997",
        "address": "USS Valdez\nFPO AE 64971",
        "gender": "Male",
        "birthday": "1999-01-06",
        "userType": "Member",
        "sendEmail": "No",
        "password": "!jOiK+v^E3",
        "confirmPassword": "n#1MBFxyx0"
    },
    {
        "fullName": "Raymond Mullins",
        "nic": "240-15-5447",
        "email": "cynthia66@benson-mills.org",
        "phoneNumber": "+1-110-982-5437x07235",
        "address": "7647 Cox Estates\nHaysfort, OR 34629",
        "gender": "Female",
        "birthday": "1955-10-07",
        "userType": "Member",
        "sendEmail": "No",
        "password": "*B+P^n8CVJ",
        "confirmPassword": "G_9MO##hRQ"
    },
    {
        "fullName": "Danielle Elliott",
        "nic": "389-77-0881",
        "email": "ebennett@gmail.com",
        "phoneNumber": "(013)989-6435x2212",
        "address": "4564 Kevin Station\nPort Benjaminton, AR 78069",
        "gender": "Female",
        "birthday": "1942-12-24",
        "userType": "Member",
        "sendEmail": "No",
        "password": "*0i6Eclq*B",
        "confirmPassword": "G4TzZ@jWq)"
    },
    {
        "fullName": "Andrew Brown",
        "nic": "325-02-5366",
        "email": "dannysingleton@turner.com",
        "phoneNumber": "+1-648-818-7134x566",
        "address": "458 Hernandez Tunnel Apt. 140\nAmyfort, VA 25783",
        "gender": "Female",
        "birthday": "1972-02-26",
        "userType": "Admin",
        "sendEmail": "Yes",
        "password": "TV)+F_4tD7",
        "confirmPassword": "q=7KH7KQ)X"
    },
    {
        "fullName": "Andrew Evans",
        "nic": "162-95-3713",
        "email": "rebeccawood@lane.com",
        "phoneNumber": "048.087.2341x236",
        "address": "52585 Stanley Place Apt. 826\nNorth Stephenfort, NJ 72115",
        "gender": "Female",
        "birthday": "2006-12-01",
        "userType": "Member",
        "sendEmail": "No",
        "password": "rH$OeGM7k3",
        "confirmPassword": "gk?D#1zE!@"
    },
    {
        "fullName": "Paul Jensen",
        "nic": "606-71-7174",
        "email": "watsonchelsea@yahoo.com",
        "phoneNumber": "(160)660-6737",
        "address": "68327 Armstrong Shoal\nNorth Garyport, SD 79134",
        "gender": "Female",
        "birthday": "1941-06-25",
        "userType": "Admin",
        "sendEmail": "Yes",
        "password": "T40*YGmGJ0",
        "confirmPassword": "Yk$3X&LD^C"
    },
    {
        "fullName": "Amanda Nguyen",
        "nic": "425-92-6681",
        "email": "shannonmeyer@walker-cameron.biz",
        "phoneNumber": "769.117.1843x1808",
        "address": "2503 Holland Fields Apt. 250\nWest Amandatown, NC 24937",
        "gender": "Female",
        "birthday": "1954-07-05",
        "userType": "Member",
        "sendEmail": "Yes",
        "password": "r!3JZ4Jm+q",
        "confirmPassword": "R3eBzDR=8V"
    },
    {
        "fullName": "Tina Watson",
        "nic": "196-62-0182",
        "email": "gailcarlson@johnson.org",
        "phoneNumber": "(200)317-4083",
        "address": "204 Rebecca Square\nDebrafurt, KS 35968",
        "gender": "Female",
        "birthday": "1985-01-06",
        "userType": "Admin",
        "sendEmail": "Yes",
        "password": "P#tF7K&VyZ",
        "confirmPassword": "w*W3O$ZZ3r"
    },
    {
        "fullName": "Jessica Perez",
        "nic": "870-19-6892",
        "email": "kellermanndiane@yahoo.com",
        "phoneNumber": "148.518.0222",
        "address": "USS Stewart\nFPO AE 45501",
        "gender": "Female",
        "birthday": "1927-09-01",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "Fk*6GvXvLg",
        "confirmPassword": "b)B^7M#A#5"
    },
    {
        "fullName": "Kevin Hale",
        "nic": "051-85-2094",
        "email": "jordanjohnson@ramsey.com",
        "phoneNumber": "492.527.6115",
        "address": "14208 Morales Garden Suite 283\nSandersborough, WI 82113",
        "gender": "Male",
        "birthday": "2013-12-21",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "##DiJe?T(N",
        "confirmPassword": "H$UQ4d5x4Y"
    },
    {
        "fullName": "Dr. Mary Ingram",
        "nic": "254-72-9880",
        "email": "pterry@watson-klein.com",
        "phoneNumber": "001-784-843-6746x01594",
        "address": "8880 Henry Mountain\nAmyview, MO 57316",
        "gender": "Female",
        "birthday": "1988-05-15",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "T43%XW@X5*",
        "confirmPassword": "F@THfD1&LG"
    },
    {
        "fullName": "Christopher Sullivan",
        "nic": "492-45-8497",
        "email": "pjones@hardy-dawson.com",
        "phoneNumber": "101-703-3140",
        "address": "306 Jones Branch Apt. 784\nMartinland, UT 91980",
        "gender": "Female",
        "birthday": "1937-09-25",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "BQ=HXBQ_5+",
        "confirmPassword": "$D_yvMYtT+"
    },
    {
        "fullName": "Kaylee Clark",
        "nic": "741-05-5427",
        "email": "kevin70@ford.org",
        "phoneNumber": "001-982-762-9818",
        "address": "141 Charles Tunnel Suite 339\nNew Lindsay, SC 33666",
        "gender": "Female",
        "birthday": "1972-01-30",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "FKF^OZpD(y",
        "confirmPassword": "F8%1=AkU1)"
    },
    {
        "fullName": "Christopher Griffith",
        "nic": "883-24-8377",
        "email": "mariasanchez@weaver-stark.com",
        "phoneNumber": "(529)678-5186",
        "address": "70536 Bowman Ridge Apt. 512\nJensenside, GA 15224",
        "gender": "Female",
        "birthday": "1995-08-08",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "D^wY^o#3tA",
        "confirmPassword": "Aw5QytS8r%"
    },
    {
        "fullName": "Mary Brown",
        "nic": "602-95-2990",
        "email": "ryan71@cruz-wright.net",
        "phoneNumber": "001-772-326-1827",
        "address": "2051 Walker Passage Apt. 059\nDixonberg, MD 51826",
        "gender": "Female",
        "birthday": "2004-01-25",
        "userType": "Member",
        "sendEmail": "No",
        "password": "e_NKXz4#c%",
        "confirmPassword": "lWsF8p1H2_"
    },
    {
        "fullName": "David Kaiser",
        "nic": "191-05-7368",
        "email": "kaiser@villarreal-smith.com",
        "phoneNumber": "915-838-3542x470",
        "address": "USNV Thomas\nFPO AP 40670",
        "gender": "Male",
        "birthday": "1933-04-16",
        "userType": "Member",
        "sendEmail": "Yes",
        "password": "uu1Q5EIs^&",
        "confirmPassword": "O0%InSJG)r"
    },
    {
        "fullName": "Holly Curry",
        "nic": "093-68-6678",
        "email": "cmartin@estrada-moon.net",
        "phoneNumber": "993.738.1450x69240",
        "address": "15219 Michelle Viaduct\nDavistown, DE 11728",
        "gender": "Male",
        "birthday": "1911-11-11",
        "userType": "Member",
        "sendEmail": "Yes",
        "password": "(!(AVCasT3",
        "confirmPassword": "$15h4GtAuk"
    },
    {
        "fullName": "Joseph Smith",
        "nic": "821-89-8894",
        "email": "reedmichele@gmail.com",
        "phoneNumber": "+1-918-340-1516x726",
        "address": "82546 Shawn Rapid Apt. 147\nNew Amanda, AK 86862",
        "gender": "Female",
        "birthday": "1945-06-14",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "TE0#4Ogxtz",
        "confirmPassword": "8Q0sW4nW_)"
    },
    {
        "fullName": "Amy Manning",
        "nic": "812-24-1471",
        "email": "toddoconnor@gmail.com",
        "phoneNumber": "260.905.4421",
        "address": "51168 Tracy Ports Suite 979\nEvansstad, NV 12551",
        "gender": "Male",
        "birthday": "1996-05-25",
        "userType": "Member",
        "sendEmail": "No",
        "password": "EJQO+0Gav1",
        "confirmPassword": "#kE+huB^k2"
    },
    {
        "fullName": "Susan Peterson",
        "nic": "445-67-0139",
        "email": "zacharyjames@yahoo.com",
        "phoneNumber": "001-092-615-3649x89209",
        "address": "3299 David Circles Suite 699\nNorth Andrea, OK 71640",
        "gender": "Female",
        "birthday": "2024-06-04",
        "userType": "Admin",
        "sendEmail": "No",
        "password": "JZK*0XEmi)",
        "confirmPassword": "3*2RBiAg$K"
    }
];

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
    setShowEditPopup(false);
    setSelectedRow(null);
  }

  const handleClearButton = () => {
    formik.resetForm();
  }

  const handleSaveButton = () => {
    console.log(selectedRow);
    setShowEditPopup(false);
  }

  return (
    <div className='users-content'>
      <div className='users-header'>
        <PageTitle 
          title='Users'
          subTitle='This is the Users Page'
        />
        {addUser === false ? (
          <div style={{ display:'flex' , gap:"10px"}}>
            <button type='button' className='users-add-button' id='edit-user-btn' onClick={handleEditeButton}>Edit User</button>
            <button type='button' className='users-add-button' id='delete-user-btn' onClick={handleAddNewUserButton}>Delete User</button>
            <button type='button' className='users-add-button' onClick={handleAddNewUserButton}>Add New User</button>
          </div>
        ): (
          // <button type='button' className='users-add-button' onClick={handleAddNewUserButton}>Add New User</button>
          ""
        )}
        
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
                  placeholder="Re Enter Password"
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
              <button type="submit">Create New User</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <Table columns={columns} data={data} onRowSelect={handleRowSelect}/>
        </div>
      )}
      {showEditPopup && (
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
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, email: e.target.value }))}
                  value={selectedRow?.email}
                  className="full-width"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Contact Number"
                  onBlur={formik.handleBlur}
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                  value={selectedRow?.phoneNumber}
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
                  onChange={(e) => setSelectedRow((prev) => ({ ...prev, sendEmail: e.target.value }))}
                  value={selectedRow?.sendEmail}
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
