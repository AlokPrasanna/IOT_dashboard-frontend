import React from 'react';
import "./deviceView.scss"
import { PageTitle } from '../../components/molecules';

const DeviceView:React.FC = () => {
  return (
    <div>
      <PageTitle 
        title='Device View'
        subTitle='This is Device Details View Page.'
      />
    </div>
  )
}

export default DeviceView
