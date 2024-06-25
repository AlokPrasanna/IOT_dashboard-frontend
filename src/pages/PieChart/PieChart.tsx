import React from 'react';
import { PageTitle , PieChart } from '../../components/molecules';
import "./pieChart.scss"

const PieChartPage:React.FC = () => {
  return (
    <div className='piechart-content' >
      <PageTitle 
        title='Pie Chart'
        subTitle='This is the Pie Chart Page'
      />
      <div style={{height:"70vh" , width:"90%" , display:'flex' , justifyContent:'center' , alignItems:'center', padding:"20px" }}>
        <PieChart />
      </div>
    </div>
  )
}

export default PieChartPage
