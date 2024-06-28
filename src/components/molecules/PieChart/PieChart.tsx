import React from 'react'
import { useTheme } from '../../../context/Theme/ThemeContext';
import { ResponsivePie } from "@nivo/pie";

// interface LineChartProps {
//     isDashboard:boolean;
// }

const PieChart:React.FC = () => {
    const {colors} = useTheme();

    const data = [
        {
          "id": "sass",
          "label": "sass",
          "value": 50,
          "color": "hsl(6, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 170,
          "color": "hsl(34, 70%, 50%)"
        },
        {
          "id": "python",
          "label": "python",
          "value": 337,
          "color": "hsl(223, 70%, 50%)"
        },
        {
          "id": "scala",
          "label": "scala",
          "value": 193,
          "color": "hsl(12, 70%, 50%)"
        },
        {
          "id": "ruby",
          "label": "ruby",
          "value": 297,
          "color": "hsl(288, 70%, 50%)"
        }
      ]

  return (
    <ResponsivePie
    data={data}
    theme={
        {tooltip: {
            container: {
                color: colors.primary[500]
            }
        }}
    }
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'nivo' }}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor= {colors.grey[100]}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ theme: 'grid.line.stroke' }}
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colors.grey[100],
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'square',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: colors.grey[300]
                    }
                }
            ]
        }
    ]}
/>
  )
}

export default PieChart
