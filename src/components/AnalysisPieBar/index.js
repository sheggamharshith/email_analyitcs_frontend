import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#003f5c", "#ffa600"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChatAnalysis = ({ width, height, data }) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={60}
        cy={60}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={60}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            className="shadow-lg border-blue-700 border"
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChatAnalysis;
