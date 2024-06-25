import React from 'react';
import { PageTitle , BarChart } from '../../components/molecules';
import "./barchart.scss"

const BarChartPage:React.FC = () => {
  return (
    <div className='barchart-content'>
      <PageTitle 
        title='Bar Chart'
        subTitle='This is the Bar Chart Page'
      />
      <div style={{height:"70vh" , width:"90%" , display:'flex' , justifyContent:'center' , alignItems:'center', padding:"20px" }}>
        <BarChart isDashboard={false} />
      </div>
    </div>
  )
}

export default BarChartPage
