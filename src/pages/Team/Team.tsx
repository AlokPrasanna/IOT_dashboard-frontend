import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./team.scss"

const Team:React.FC = () => {
  return (
    <div className='team-content'>
      <PageTitle 
        title='Team Members'
        subTitle='This is the Team Members Page'
      />
    </div>
  )
}

export default Team
