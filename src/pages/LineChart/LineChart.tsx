import React from 'react';
import { PageTitle , LineChart } from '../../components/molecules';
import "./lineChart.scss"

const LineChartPage:React.FC = () => {
  return (
    <div className='linechart-content'>
      <PageTitle 
        title='Line Chart'
        subTitle='This is the Line Chart Page'
      />
      <div style={{height:"70vh" , width:"90%" , display:'flex' , justifyContent:'center' , alignItems:'center', padding:"20px" }}>
        <LineChart isDashboard={false} />
      </div>
    </div>
  )
}

export default LineChartPage
