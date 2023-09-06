import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect, useState } from "react";
import React from "react";

const Deposits = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/stats/balance");
      const data = await res.json();

      setBalance(Number(data.balance));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBalance();
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
