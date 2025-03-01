import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const GaugeMeter = ({ percentage }) => {
  const data = [{ value: percentage, fill: getColor(percentage) }];

  function getColor(value) {
    if (value < 50) return "#E74C3C"; // Red
    if (value < 75) return "#F1C40F"; // Yellow
    return "#2ECC71"; // Green
  }

  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={300}
        height={200}
        cx={150}
        cy={150}
        innerRadius="70%"
        outerRadius="100%"
        startAngle={180}
        endAngle={0}
        barSize={15}
        data={data}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={10} />
      </RadialBarChart>
      <div className="text-xl font-semibold">{percentage}%</div>
    </div>
  );
};

export default GaugeMeter;