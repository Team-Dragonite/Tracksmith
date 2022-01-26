import React from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
const ConversionRates = () => (
  <>
    <h1>Conversion Rate Chart</h1>
    <Link to="/dashboard">
      <Button variant="contained">
        Back
      </Button>
    </Link>
    <VictoryChart
      padding={{ top: 40, bottom: 80, left: 40, right: 80 }}
      theme={VictoryTheme.material}
      domainPadding={{ x: 20 }}
      height={210}
      width={300}
    >
      <VictoryBar
        barWidth={({ index }) => (index + 1) * 2 + 10}
        cornerRadius={{ topLeft: ({ datum }) => datum.x * 4 }}
        style={{ data: { fill: "#F4511E" } }}
        data={[
          { x: 1, y: 60, label: "Initial Phone Call" },
          { x: 2, y: 30, label: "Onsite Interwiews" },
          { x: 3, y: 10, label: "Offers" },
        ]}
      />
    </VictoryChart>
  </>
);
export default ConversionRates;