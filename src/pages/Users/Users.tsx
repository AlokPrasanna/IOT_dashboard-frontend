import React, { useState , useEffect } from 'react';
import { PageTitle  } from '../../components/molecules';
import "./users.scss";
import { useTheme } from '../../context/Theme/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon , Table } from '../../components/atoms';
import useFetch from '../../hooks/UseFetch';


interface FormValues {
  fullName: string;
  nic: string;
  email: string;
  contact: string;
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
  contact: '',
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

interface User {
  _id: string;
  fullName: string;
  emailAddress: string;
  imageUrl: string;
  nic: string;
  contact: string;
  gender: string;
  birthday: string;
  userType: string;
  sendEmailStatus: string;
}

const Users: React.FC<UsersProps> = ({isCollapsed}) => {
  //const {data , loading , error} = useFetch({path:"users/all"});
  const [usersData , setUsersData] = useState<any>([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [showEditPopup , setShowEditPopup] = useState<boolean>(false);
  const { colors } = useTheme();

  // useEffect(() => {
  //  if(data.status){
  //   const transformData = data.users.map((d:User) => ({
  //     id:d._id,
  //     fullName:d.fullName,
  //     emailAddress:d.emailAddress,
  //     imgeUrl:d.imageUrl,
  //     nic:d.nic,
  //     contact:d.contact,
  //     gender:d.gender,
  //     birthday:d.birthday,
  //     userType:d.userType,
  //     sedEmailStatus:d.sendEmailStatus
  //   }));
  //   setUsersData(transformData);
  //  }
  // },[data])

  //console.log(data);

  const data = [
    {
      "id": "1",
      "fullName": "John Doe",
      "emailAddress": "john.doe@gmail.com",
      "imgeUrl": "http://example.com/image1.jpg",
      "nic": "200200200200",
      "contact": "5005006001",
      "gender": "Male",
      "birthday": "1990/01/01",
      "userType": "Admin",
      "sedEmailStatus": "No",
      "address": "123 Main St, Springfield, IL 62701"
    },
    {
      "id": "2",
      "fullName": "Jane Smith",
      "emailAddress": "jane.smith@gmail.com",
      "imgeUrl": "http://example.com/image2.jpg",
      "nic": "200200200201",
      "contact": "5005006002",
      "gender": "Female",
      "birthday": "1991/02/02",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "456 Elm St, Springfield, IL 62702"
    },
    {
      "id": "3",
      "fullName": "Alice Johnson",
      "emailAddress": "alice.johnson@gmail.com",
      "imgeUrl": "http://example.com/image3.jpg",
      "nic": "200200200202",
      "contact": "5005006003",
      "gender": "Female",
      "birthday": "1992/03/03",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "789 Oak St, Springfield, IL 62703"
    },
    {
      "id": "4",
      "fullName": "Bob Brown",
      "emailAddress": "bob.brown@gmail.com",
      "imgeUrl": "http://example.com/image4.jpg",
      "nic": "200200200203",
      "contact": "5005006004",
      "gender": "Male",
      "birthday": "1993/04/04",
      "userType": "Admin",
      "sedEmailStatus": "Yes",
      "address": "101 Maple St, Springfield, IL 62704"
    },
    {
      "id": "5",
      "fullName": "Charlie Davis",
      "emailAddress": "charlie.davis@gmail.com",
      "imgeUrl": "http://example.com/image5.jpg",
      "nic": "200200200204",
      "contact": "5005006005",
      "gender": "Male",
      "birthday": "1994/05/05",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "202 Pine St, Springfield, IL 62705"
    },
    {
      "id": "6",
      "fullName": "David Evans",
      "emailAddress": "david.evans@gmail.com",
      "imgeUrl": "http://example.com/image6.jpg",
      "nic": "200200200205",
      "contact": "5005006006",
      "gender": "Male",
      "birthday": "1995/06/06",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "303 Birch St, Springfield, IL 62706"
    },
    {
      "id": "7",
      "fullName": "Eve Wilson",
      "emailAddress": "eve.wilson@gmail.com",
      "imgeUrl": "http://example.com/image7.jpg",
      "nic": "200200200206",
      "contact": "5005006007",
      "gender": "Female",
      "birthday": "1996/07/07",
      "userType": "Admin",
      "sedEmailStatus": "No",
      "address": "404 Cedar St, Springfield, IL 62707"
    },
    {
      "id": "8",
      "fullName": "Frank Garcia",
      "emailAddress": "frank.garcia@gmail.com",
      "imgeUrl": "http://example.com/image8.jpg",
      "nic": "200200200207",
      "contact": "5005006008",
      "gender": "Male",
      "birthday": "1997/08/08",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "505 Walnut St, Springfield, IL 62708"
    },
    {
      "id": "9",
      "fullName": "Grace Martin",
      "emailAddress": "grace.martin@gmail.com",
      "imgeUrl": "http://example.com/image9.jpg",
      "nic": "200200200208",
      "contact": "5005006009",
      "gender": "Female",
      "birthday": "1998/09/09",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "606 Cherry St, Springfield, IL 62709"
    },
    {
      "id": "10",
      "fullName": "Henry Lee",
      "emailAddress": "henry.lee@gmail.com",
      "imgeUrl": "http://example.com/image10.jpg",
      "nic": "200200200209",
      "contact": "5005006010",
      "gender": "Male",
      "birthday": "1999/10/10",
      "userType": "Admin",
      "sedEmailStatus": "Yes",
      "address": "707 Sycamore St, Springfield, IL 62710"
    },
    {
      "id": "11",
      "fullName": "Isabel Clark",
      "emailAddress": "isabel.clark@gmail.com",
      "imgeUrl": "http://example.com/image11.jpg",
      "nic": "200200200210",
      "contact": "5005006011",
      "gender": "Female",
      "birthday": "2000/11/11",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "808 Ash St, Springfield, IL 62711"
    },
    {
      "id": "12",
      "fullName": "Jack King",
      "emailAddress": "jack.king@gmail.com",
      "imgeUrl": "http://example.com/image12.jpg",
      "nic": "200200200211",
      "contact": "5005006012",
      "gender": "Male",
      "birthday": "1989/12/12",
      "userType": "Admin",
      "sedEmailStatus": "Yes",
      "address": "909 Elmwood St, Springfield, IL 62712"
    },
    {
      "id": "13",
      "fullName": "Karen Wright",
      "emailAddress": "karen.wright@gmail.com",
      "imgeUrl": "http://example.com/image13.jpg",
      "nic": "200200200212",
      "contact": "5005006013",
      "gender": "Female",
      "birthday": "1988/01/13",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "1010 Evergreen St, Springfield, IL 62713"
    },
    {
      "id": "14",
      "fullName": "Leo Scott",
      "emailAddress": "leo.scott@gmail.com",
      "imgeUrl": "http://example.com/image14.jpg",
      "nic": "200200200213",
      "contact": "5005006014",
      "gender": "Male",
      "birthday": "1987/02/14",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "1111 Holly St, Springfield, IL 62714"
    },
    {
      "id": "15",
      "fullName": "Mia Green",
      "emailAddress": "mia.green@gmail.com",
      "imgeUrl": "http://example.com/image15.jpg",
      "nic": "200200200214",
      "contact": "5005006015",
      "gender": "Female",
      "birthday": "1986/03/15",
      "userType": "Admin",
      "sedEmailStatus": "No",
      "address": "1212 Poplar St, Springfield, IL 62715"
    },
    {
      "id": "16",
      "fullName": "Nick Baker",
      "emailAddress": "nick.baker@gmail.com",
      "imgeUrl": "http://example.com/image16.jpg",
      "nic": "200200200215",
      "contact": "5005006016",
      "gender": "Male",
      "birthday": "1985/04/16",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "1313 Dogwood St, Springfield, IL 62716"
    },
    {
      "id": "17",
      "fullName": "Olivia Hill",
      "emailAddress": "olivia.hill@gmail.com",
      "imgeUrl": "http://example.com/image17.jpg",
      "nic": "200200200216",
      "contact": "5005006017",
      "gender": "Female",
      "birthday": "1984/05/17",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "1414 Fir St, Springfield, IL 62717"
    },
    {
      "id": "18",
      "fullName": "Paul Harris",
      "emailAddress": "paul.harris@gmail.com",
      "imgeUrl": "http://example.com/image18.jpg",
      "nic": "200200200217",
      "contact": "5005006018",
      "gender": "Male",
      "birthday": "1983/06/18",
      "userType": "Admin",
      "sedEmailStatus": "Yes",
      "address": "1515 Maple St, Springfield, IL 62718"
    },
    {
      "id": "19",
      "fullName": "Quincy Young",
      "emailAddress": "quincy.young@gmail.com",
      "imgeUrl": "http://example.com/image19.jpg",
      "nic": "200200200218",
      "contact": "5005006019",
      "gender": "Male",
      "birthday": "1982/07/19",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "1616 Palm St, Springfield, IL 62719"
    },
    {
      "id": "20",
      "fullName": "Rachel Adams",
      "emailAddress": "rachel.adams@gmail.com",
      "imgeUrl": "http://example.com/image20.jpg",
      "nic": "200200200219",
      "contact": "5005006020",
      "gender": "Female",
      "birthday": "1981/08/20",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "1717 Willow St, Springfield, IL 62720"
    },
    {
      "id": "21",
      "fullName": "Steve Mitchell",
      "emailAddress": "steve.mitchell@gmail.com",
      "imgeUrl": "http://example.com/image21.jpg",
      "nic": "200200200220",
      "contact": "5005006021",
      "gender": "Male",
      "birthday": "1980/09/21",
      "userType": "Admin",
      "sedEmailStatus": "No",
      "address": "1818 Magnolia St, Springfield, IL 62721"
    },
    {
      "id": "22",
      "fullName": "Tina Phillips",
      "emailAddress": "tina.phillips@gmail.com",
      "imgeUrl": "http://example.com/image22.jpg",
      "nic": "200200200221",
      "contact": "5005006022",
      "gender": "Female",
      "birthday": "1979/10/22",
      "userType": "User",
      "sedEmailStatus": "Yes",
      "address": "1919 Olive St, Springfield, IL 62722"
    },
    {
      "id": "23",
      "fullName": "Uma Stewart",
      "emailAddress": "uma.stewart@gmail.com",
      "imgeUrl": "http://example.com/image23.jpg",
      "nic": "200200200222",
      "contact": "5005006023",
      "gender": "Female",
      "birthday": "1978/11/23",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "2020 Vine St, Springfield, IL 62723"
    },
    {
      "id": "24",
      "fullName": "Victor Ross",
      "emailAddress": "victor.ross@gmail.com",
      "imgeUrl": "http://example.com/image24.jpg",
      "nic": "200200200223",
      "contact": "5005006024",
      "gender": "Male",
      "birthday": "1977/12/24",
      "userType": "Admin",
      "sedEmailStatus": "Yes",
      "address": "2121 Ivy St, Springfield, IL 62724"
    },
    {
      "id": "25",
      "fullName": "Wendy Allen",
      "emailAddress": "wendy.allen@gmail.com",
      "imgeUrl": "http://example.com/image25.jpg",
      "nic": "200200200224",
      "contact": "5005006025",
      "gender": "Female",
      "birthday": "1976/01/25",
      "userType": "User",
      "sedEmailStatus": "No",
      "address": "2222 Oakwood St, Springfield, IL 62725"
    }
  ]

  const handleRowSelect = (rowData: Record<string, any>) => {
    setSelectedRow(rowData);
    console.log('Selected Row Data:', selectedRow);
  };

  const handleEditeButton = () => {
    if(selectedRow === null){
      alert("Please select row before click 'Edite User' button");
      return;
    }
    setShowEditPopup(true);
  }

  useEffect(() => {
    if (selectedRow !== null) {
        console.log('Selected Row Data:', selectedRow);
    }
}, [selectedRow]);

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
    { accessKey: "emailAddress", value: "Email" },
    { accessKey: "contact", value: "Contact No." },
    { accessKey: "address", value: "Address" },
    { accessKey: "gender", value: "Gender" },
    { accessKey: "birthday", value: "Birthday" },
    { accessKey: "userType", value: "User Type" },
    { accessKey: "sedEmailStatus", value: "Send Email Status" },
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
    //setSelectedRow(null);
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
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
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
                  style={{ cursor: 'pointer' , color: "black" , backgroundColor:"none",  width:"25px" , background:"none" , border:"none",position:"absolute" , right:"5px", top:"60%", transform:"translateY(-50%)"}}
                />
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
                  style={{ cursor: 'pointer' , backgroundColor:"none", color: "black" ,  width:"25px" , background:"none" , border:"none",position:"absolute" , right:"5px", top:"60%", transform:"translateY(-50%)"} }
                />
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
          {data && (
            <Table columns={columns} data={data} onRowSelect={handleRowSelect}/>
          )}
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
