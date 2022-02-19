import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

const ConversionRates = () => {

const conversionData = useSelector((state) => state.conversions);


return (
<>
    <h1 style={{textAlign: 'center'}}>Conversion Rate Chart</h1>
    <Link to="/dashboard">
      <Button variant="contained">
        Back
      </Button>
    </Link>
    <VictoryChart
      padding={{ top: 40, bottom: 80, left: 40, right: 80 }}
      theme={VictoryTheme.material}
      domainPadding={{ x: 10 }}
      height={180}
      width={400}
    >
      <VictoryBar
        barWidth={({ index }) => (index + 1) * 2 + 10}
        cornerRadius={{ topLeft: ({ datum }) => datum.x * 1.5 }}
        style={{ data: { fill: "#F4511E" } }}
        data={[
          { x: 1, y: conversionData?.totals, label: "Total Applications" },
          { x: 2, y: conversionData?.hrScreen, label: "Initial Screening" },
          { x: 3, y: conversionData?.technicalInterview, label: "Interwiews" },
          { x: 4, y: 10, label: "Offers" },
        ]}
      />
    </VictoryChart>
  </>
  )
} 
export default ConversionRates;