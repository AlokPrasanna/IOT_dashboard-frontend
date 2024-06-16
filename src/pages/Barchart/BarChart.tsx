import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./barchart.scss"

const BarChart:React.FC = () => {
  return (
    <div className='barchart-content'>
      <PageTitle 
        title='Bar Chart'
        subTitle='This is the Bar Chart Page'
      />
    </div>
  )
}

export default BarChart
