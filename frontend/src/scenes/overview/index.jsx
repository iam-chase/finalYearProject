import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select, Button } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");

  const handleRefresh = () => {
    // Logic to refresh data can be added here
    console.log("Data refreshed");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
      
      {/* Container for View and Refresh Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        {/* View Selection */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        {/* Refresh Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleRefresh} 
          sx={{ alignSelf: 'flex-end' }}
        >
          Refresh Data
        </Button>
      </Box>

      {/* Overview Chart */}
      <Box height="75vh">
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;


