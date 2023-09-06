import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";

interface APIResponse {
  id: string;
  start_place_name: string;
  end_place_name: string;
  fee: number;
  payment_type: string;
  book_time: string;
}

export default function Orders() {
  const [bookings, setBookings] = useState<APIResponse[]>([]);

  const fetchRecentRides = async () => {
    try {
      const res = await fetch("/api/stats/recent_rides");
      const data = await res.json();

      setBookings(
        data.map((item: APIResponse) => {
          const date = new Date(item.book_time);
          item.book_time = date.toLocaleDateString();
          return item;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecentRides();
  }, []);

  return (
    <React.Fragment>
      <Title>Đơn đặt gần đây</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Start Place</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.book_time}</TableCell>
              <TableCell>{booking.start_place_name}</TableCell>
              <TableCell>{booking.end_place_name}</TableCell>
              <TableCell>{booking.payment_type}</TableCell>
              <TableCell align="right">
                {booking.fee.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
