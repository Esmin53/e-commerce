"use client"

import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    amt: 27
  },
  {
    name: 'Page B',
    amt: 27
  },
  {
    name: 'Page C',
    amt: 27
  },
  {
    name: 'Page D',
    amt: 27
  },
  {
    name: 'Page E',
    amt: 27
  },
  {
    name: 'Page F',
    amt: 27
  },
  {
    name: 'Page G',
    amt: 27
  },
];

interface BarChartProps {
    sizes: {
        name: string,
        count: number
    }[]
}

const BarChartComponent = ({sizes}: BarChartProps) => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sizes}>
            <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" label="Sizes" fill="#E11D48" />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default BarChartComponent
