import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const BarChart = ({xAxisName, yAxisName, chartData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const customTheme = {
    axis: {
      legend: {
        text: {
          fill: colors.headingColor.main,
        },
      },
      ticks: {
        text: {
          fill: colors.headingColor.main,
        },
      },
    },
  };
  return (
    <ResponsiveBar
      data={chartData}
      theme={customTheme}
      keys={['calories']}
      indexBy='food'
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
        legend: xAxisName,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisName,
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      enableGridX={true}
      enableGridY={true}
    />
  );
};

export default BarChart;
