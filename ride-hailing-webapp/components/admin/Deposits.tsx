import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect, useState } from "react";
import React from "react";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
const Deposits = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("/api/stats/balance")
      .then((res) => res.json())
      .then((data) => setBalance(Number(data.balance)));
  }, []);

  return (
    <React.Fragment>
      <Title>Doanh thu</Title>
      <Typography component="p" variant="h4">
        {balance.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </React.Fragment>
  );
};

export default Deposits;
