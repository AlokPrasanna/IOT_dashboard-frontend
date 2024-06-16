import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./lineChart.scss"

const LineChart:React.FC = () => {
  return (
    <div className='linechart-content'>
      <PageTitle 
        title='Line Chart'
        subTitle='This is the Line Chart Page'
      />
    </div>
  )
}

export default LineChart
