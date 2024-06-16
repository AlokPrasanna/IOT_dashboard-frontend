import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./dashboard.scss"

const Dashboard:React.FC = () => {
  return (
    <div className='dashboard-content'>
      <PageTitle 
        title='Dashboard'
        subTitle='This is the IOT Dashboard Page'
      />
    </div>
  )
}

export default Dashboard
