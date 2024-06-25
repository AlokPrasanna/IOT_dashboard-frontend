import React from 'react';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { ResponsiveLine } from "@nivo/line";

interface LineChartProps {
    isDashboard:boolean;
}

const LineChart:React.FC<LineChartProps> = ({ isDashboard = false }) => {
    const {colors} = useTheme();

    const data = [
        {
          "id": "japan",
          "color": "hsl(195, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 156
            },
            {
              "x": "helicopter",
              "y": 10
            },
            {
              "x": "boat",
              "y": 162
            },
            {
              "x": "train",
              "y": 143
            },
            {
              "x": "subway",
              "y": 297
            },
            {
              "x": "bus",
              "y": 229
            },
            {
              "x": "car",
              "y": 84
            },
            {
              "x": "moto",
              "y": 122
            },
            {
              "x": "bicycle",
              "y": 77
            },
            {
              "x": "horse",
              "y": 163
            },
            {
              "x": "skateboard",
              "y": 124
            },
            {
              "x": "others",
              "y": 157
            }
          ]
        },
        {
          "id": "france",
          "color": "hsl(70, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 13
            },
            {
              "x": "helicopter",
              "y": 260
            },
            {
              "x": "boat",
              "y": 70
            },
            {
              "x": "train",
              "y": 193
            },
            {
              "x": "subway",
              "y": 105
            },
            {
              "x": "bus",
              "y": 79
            },
            {
              "x": "car",
              "y": 58
            },
            {
              "x": "moto",
              "y": 151
            },
            {
              "x": "bicycle",
              "y": 220
            },
            {
              "x": "horse",
              "y": 81
            },
            {
              "x": "skateboard",
              "y": 7
            },
            {
              "x": "others",
              "y": 116
            }
          ]
        },
        {
          "id": "us",
          "color": "hsl(331, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 205
            },
            {
              "x": "helicopter",
              "y": 19
            },
            {
              "x": "boat",
              "y": 254
            },
            {
              "x": "train",
              "y": 150
            },
            {
              "x": "subway",
              "y": 87
            },
            {
              "x": "bus",
              "y": 56
            },
            {
              "x": "car",
              "y": 233
            },
            {
              "x": "moto",
              "y": 167
            },
            {
              "x": "bicycle",
              "y": 2
            },
            {
              "x": "horse",
              "y": 172
            },
            {
              "x": "skateboard",
              "y": 61
            },
            {
              "x": "others",
              "y": 81
            }
          ]
        },
        {
          "id": "germany",
          "color": "hsl(155, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 289
            },
            {
              "x": "helicopter",
              "y": 33
            },
            {
              "x": "boat",
              "y": 186
            },
            {
              "x": "train",
              "y": 157
            },
            {
              "x": "subway",
              "y": 184
            },
            {
              "x": "bus",
              "y": 167
            },
            {
              "x": "car",
              "y": 124
            },
            {
              "x": "moto",
              "y": 275
            },
            {
              "x": "bicycle",
              "y": 8
            },
            {
              "x": "horse",
              "y": 66
            },
            {
              "x": "skateboard",
              "y": 132
            },
            {
              "x": "others",
              "y": 147
            }
          ]
        },
        {
          "id": "norway",
          "color": "hsl(186, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 155
            },
            {
              "x": "helicopter",
              "y": 242
            },
            {
              "x": "boat",
              "y": 114
            },
            {
              "x": "train",
              "y": 295
            },
            {
              "x": "subway",
              "y": 75
            },
            {
              "x": "bus",
              "y": 118
            },
            {
              "x": "car",
              "y": 277
            },
            {
              "x": "moto",
              "y": 74
            },
            {
              "x": "bicycle",
              "y": 10
            },
            {
              "x": "horse",
              "y": 184
            },
            {
              "x": "skateboard",
              "y": 190
            },
            {
              "x": "others",
              "y": 191
            }
          ]
        }
      ]
  return (
    <ResponsiveLine
        data={data}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
                container: {
                    color: colors.primary[500]
                }
            },
            crosshair: {
                line: {
                    stroke: colors.grey[100],
                },
            },
          }}
          colors={isDashboard ? {datum: "color"} : {scheme: "nivo"}}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: isDashboard ? 'row' :'column',
                justify: false,
                translateX: isDashboard ? -50 : 100,
                translateY: isDashboard ? 55 :0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default LineChart
