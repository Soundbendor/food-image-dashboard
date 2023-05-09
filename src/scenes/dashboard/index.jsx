import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import CalendarChart from "../../components/CalendarChart";
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList, setUserList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUsers").then((data) => {
      console.log(data)
      setUserList(data.data)
    });
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getFoods").then((data) => {
      console.log(data)
      setFoodList(data.data)
    });
  }, []);

  console.log(userList);
  console.log(foodList);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Typography
          color={colors.headingColor.main}
          variant="h2"
          fontWeight="600"
        >
          DASHBOARD
        </Typography>

        <Box>
          <a style={{ 'text-decoration': 'none' }} href="../addmeal">
            <Button
              sx={{
                backgroundColor: colors.boxColor.main,
                color: colors.headingColor.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >

              <AddCircleOutlineIcon sx={{ mr: "10px" }} />
              Add a Meal

            </Button>
          </a>
        </Box>
      </Box>

      {/* GRID & CHARTS 
      grid column charts have a span of 12 per row*/}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
      >
        {/* ROW 1 */}
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          backgroundColor={colors.boxColor.main}
          display="flex"
          alignItems="center"
          justifyContent="center"

        >
          <StatBox
            title={userList.length}
            subtitle="Patients"
            icon={
              <PersonAddIcon
                sx={{ color: colors.headingColor.main, fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          backgroundColor={colors.boxColor.main}

          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={foodList.length}

            subtitle="Meals in Database"
            icon={
              <FastfoodIcon
                sx={{ color: colors.headingColor.main, fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.headingColor.main}`}
            colors={colors.headingColor.main}
            p="15px"
          >
            <Typography color={colors.headingColor.main} variant="h5" fontWeight="600">
              Your Patient List
            </Typography>
          </Box>

          {userList.map((patients, i) => (
            <Box
              key={`${patients.UserID}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.headingColor.main}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.headingColor.main}
                  variant="h5"
                  fontWeight="600"
                >
                  {patients.FName + " " + patients.LName}
                </Typography>
                <Typography color={colors.headingColor.main}>
                  {patients.UserName}
                </Typography>
              </Box>
              <Box color={colors.headingColor.main}>{patients.UserID}</Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
          overflow="auto"
        >
          <Box

            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.headingColor.main}`}
            colors={colors.headingColor.main}
            p="15px"
          >
            <Typography color={colors.headingColor.main} variant="h5" fontWeight="600">
              Meals List
            </Typography>
          </Box>

          {foodList.map((meals, i) => (
            <Box
              key={`${meals.FoodName}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.headingColor.main}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.headingColor.main}
                  variant="h5"
                  fontWeight="600"
                >
                  {meals.FoodName}
                </Typography>
                <Typography color={colors.headingColor.main}>
                  {meals.Calories + " Calories Per Serving"}
                </Typography>
              </Box>
              <Box color={colors.headingColor.main}>{meals.FoodID}</Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.headingColor.main}
              >
                Recent Patient Food Intake %
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.headingColor.main}
              >
                Past 30 Days
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.headingColor.main}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Calories of Food
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart
            xAxisName={"Food"}
            yAxisName={"Calories"}
              chartData={[
                { food: 'Pizza', calories: 285 },
                { food: 'Hamburger', calories: 354 },
                { food: 'Salad', calories: 85 },
                { food: 'Fried Chicken', calories: 310 },
                { food: 'Spaghetti', calories: 221 },
              ]}
            />

          </Box>
        </Box>
        {/* ROW 4 */}
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.headingColor.main}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Patient Location
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart
              pieData={[
                { id: 'Central', value: 10 },
                { id: 'Pacific', value: 13 },
                { id: 'Southwest', value: 4 },
              ]}
            />

          </Box>
        </Box>
        <Box
          sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.boxColor.main}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.headingColor.main}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Daily Food Data Collected
          </Typography>
          <Box height="250px" mt="-20px">
            <CalendarChart
              calendarData={[
                {
                  "value": 29,
                  "day": "2023-12-1"
                }
              ]}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
