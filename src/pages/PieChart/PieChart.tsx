import React from 'react';
import { PageTitle } from '../../components/molecules';
import "./pieChart.scss"

const PieChart:React.FC = () => {
  return (
    <div className='piechart-content'>
      <PageTitle 
        title='Pie Chart'
        subTitle='This is the Pie Chart Page'
      />
    </div>
  )
}

export default PieChart
