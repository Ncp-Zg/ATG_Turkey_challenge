import { AspectRatio } from '@mui/icons-material'
import React from 'react'
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

const LineChart = ({data}) => {
  return (
    <div>
        <Line data={data} options={AspectRatio} />
    </div>
  )
}

export default LineChart