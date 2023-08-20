import { Title } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface APIResponse {
  day: string;
  count: number;
}

interface UIDataElement {
  time: string;
  amount?: number;
}

const Chart = () => {
  const [data, setData] = useState<UIDataElement[]>([]);

  useEffect(() => {
    fetch("/api/stats/booking_per_day")
      .then((res) => res.json())
      .then((data: APIResponse[]) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = currentDate;

        let handledData: UIDataElement[] = [];

        data.forEach((item) => {
          handledData.push({
            time: new Date(item.day).toLocaleDateString(),
            amount: item.count,
          });
        });

        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          if (
            !handledData.find((item) => item.time === date.toLocaleDateString())
          ) {
            handledData.push({
              time: date.toLocaleDateString(),
              amount: 0,
            });
          }
        }

        handledData.sort((a, b) => {
          const dateA = new Date(a.time.split("/").reverse().join("/"));
          const dateB = new Date(b.time.split("/").reverse().join("/"));

          return dateA.getTime() - dateB.getTime(); // Compare dates
        });

        setData(handledData);
      });
  }, []);

  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Lượng đơn đặt xe
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Chart;
