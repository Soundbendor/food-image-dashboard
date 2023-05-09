import { ResponsiveCalendar } from "@nivo/calendar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const CalendarChart = ({calendarData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const customTheme = {
        fontSize: "14px",
        textColor: colors.headingColor.main,
        tooltip: {
            container: {
                background: "#333",
            },
        },
        labels: {
            textColor: colors.headingColor.main,
        },
        calendar: {
            month: {
                textColor: colors.headingColor.main,
                paddingBottom: "10px",
            },
            year: {
                textColor: colors.headingColor.main,
                paddingBottom: "40px",
            },
        },
    };

    return (
        <ResponsiveCalendar
            data={calendarData}
            from="2023-01-01"
            to="2023-05-12"
            emptyColor="#ffffff"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#000000"
            dayBorderWidth={2}
            dayBorderColor="#eeeeee"
            legends={[                {                    anchor: 'bottom-right',                    direction: 'row',                    translateY: 36,                    itemCount: 4,                    itemWidth: 42,                    itemHeight: 36,                    itemsSpacing: 14,                    textColor: "#FFFFFF",                    itemDirection: 'right-to-left'                }            ]}
            theme={customTheme}
        />
    );
};

export default CalendarChart;
