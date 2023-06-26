import React from "react";
import {
  ChartContainer,
  Bar,
  BarContent,
  BarText,
  BarHover,
  ChartFooter,
  FooterText,
} from "./style";
const Barchart = ({ data }) => {
  // Find the maximum output value to determine the scaling factor
  const maxOutput = Math.max(...data.map((item) => item.output));

  return (
    <ChartContainer>
      {data.map((item, index) => (
        <Bar key={index} height={(item.output / maxOutput) * 100}>
          <BarContent>
            <BarHover>
              <p>Latitude: {item.lat}</p>
              <p>Longitude: {item.lon}</p>
              <p>Product: {item.companyProductName}</p>
              <hp>power output: {item.output}</hp>
            </BarHover>
          </BarContent>
        </Bar>
      ))}
    </ChartContainer>
  );
};

export default Barchart;
