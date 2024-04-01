"use client"

import { HEX } from "@/config"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const PieChartComponent = ({colors}: {colors: string[]}) => {

    

      let count: {[key: string]: number} = {}

      colors.forEach((item) => {
        count[item] = (count[item] || 0) + 1
      })
      console.log(colors) 

      console.log(count)
      const data = Object.keys(count).map((key) => {
        return {name: key, value: count[key]}
      })


    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart height={70} width={70}>
            <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            startAngle={360}
            endAngle={0}
            innerRadius={55}
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`}  fill={HEX[entry.name]}/>
            ))}
          </Pie>
          <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComponent