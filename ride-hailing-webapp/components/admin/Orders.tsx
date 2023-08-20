import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

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

  useEffect(() => {
    fetch("/api/stats/recent_rides")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBookings(
          data.map((item: APIResponse) => {
            const date = new Date(item.book_time);
            item.book_time = date.toLocaleDateString();
            return item;
          })
        );
      });
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
