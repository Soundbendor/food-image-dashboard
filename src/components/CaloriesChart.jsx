import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const CaloriesChart = ({chartData}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axisTheme = {
    axis: {
      textColor: colors.headingColor.main,
      fontSize: '14px',
      tickColor: colors.headingColor.main,
    },
    grid: {
      stroke: colors.headingColor.main,
      strokeWidth: 1
    },
  };

  return (
    <ResponsiveBar
    data={chartData}
    keys={['calories']}
    indexBy="food"
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: 'category10' }}
    labelTextColor={colors.headingColor.main} 
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Food',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Calories',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={true}
    theme={axisTheme}
  />
  );
};

export default CaloriesChart;
