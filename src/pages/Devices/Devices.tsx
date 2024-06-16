import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./devices.scss"

const Devices:React.FC = () => {
  return (
    <div className='devices-content'>
      <PageTitle 
        title='Devices'
        subTitle='This is the Devices Page'
      />
    </div>
  )
}

export default Devices
