"use client"

import {AreaChart, Area, Tooltip, YAxis, XAxis, CartesianGrid, ResponsiveContainer} from "recharts"

interface AreaChartProps {
    chartData: {
        name: string,
        revenue: number
    }[]
}

const AreaChartComponent = ({chartData}: AreaChartProps) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#E11D48" fill="#E11D48" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartComponent