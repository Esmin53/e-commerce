"use client"

import {AreaChart, Area, Tooltip, YAxis, XAxis, CartesianGrid, ResponsiveContainer} from "recharts"

interface AreaChartProps {
    chartData: {
        name: string,
        revenue: number
    }[]
}

const AreaChartComponent = ({chartData}: AreaChartProps) => {

    console.log("Chart Data: ", chartData)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#6A0DAD" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartComponent