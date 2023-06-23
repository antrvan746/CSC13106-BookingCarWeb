import React, { ChangeEvent, useState } from "react";
import dayjsFunc, { Dayjs } from "dayjs";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MotorcycleIcon from "../../../assets/motorcycle.png";
import SedanIcon from "../../../assets/sedan.png";
import ShuttleBusIcon from "../../../assets/shuttlebus.png";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DigitalWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/Money";

import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPlaceInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyleInforInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BookingForm = () => {
  const [age, setAge] = React.useState("");
  const [selectedVehicle, setSelectedVehicle] = React.useState("motorcycle");

  const [value, setValue] = React.useState<Dayjs | null>(dayjsFunc());

  const handleVehicleChange = (event: any) => {
    console.log(event.target.value);
    setSelectedVehicle(event.target.value);
  };

  return (
    <StyledContainer>
      <FormControl style={{ width: "95%" }}>
        <StyledPlaceInput>
          <PlaceIcon
            style={{
              fill: "#237FEB",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <TextField
            label="Điểm đi"
            size="small"
            variant="outlined"
            fullWidth
          />
        </StyledPlaceInput>

        <StyledPlaceInput>
          <PlaceIcon
            style={{
              fill: "#EB3223",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <TextField
            label="Điểm đến"
            size="small"
            variant="outlined"
            fullWidth
          />
        </StyledPlaceInput>

        <StyleInforInput>
          <PersonIcon
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />

          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            size="small"
            variant="outlined"
            style={{
              marginRight: "5px",
            }}
          />
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="given-name"
            size="small"
            variant="outlined"
          />
        </StyleInforInput>

        <StyleInforInput>
          <ContactPhoneIcon
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <TextField
            label="Số điện thoại"
            size="small"
            variant="outlined"
            fullWidth
            required
          />
        </StyleInforInput>

        <StyleInforInput>
          <CalendarMonthIcon
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              format="L hh:mm a"
            />
          </LocalizationProvider>
        </StyleInforInput>

        <FormGroup>
          <FormLabel
            style={{
              paddingLeft: "1rem",
              marginTop: "2rem",
            }}
          >
            Loại xe cần đặt
          </FormLabel>
          <RadioGroup
            onChange={handleVehicleChange}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "2rem",
            }}
          >
            <FormControlLabel
              value="motorcycle"
              control={
                <Radio
                  checked={selectedVehicle === "motorcycle"}
                  icon={
                    <Image
                      src={MotorcycleIcon}
                      alt="Motorcycle Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <Image
                      src={MotorcycleIcon}
                      alt="Motorcycle Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                />
              }
              label="Xe máy"
              labelPlacement="bottom"
            />

            <FormControlLabel
              value="4seats"
              control={
                <Radio
                  checked={selectedVehicle === "4seats"}
                  icon={
                    <Image
                      src={SedanIcon}
                      alt="Sedan Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <Image
                      src={SedanIcon}
                      alt="Sedan Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                />
              }
              label="Xe 4 chỗ"
              labelPlacement="bottom"
            />

            <FormControlLabel
              value="7seats"
              control={
                <Radio
                  checked={selectedVehicle === "7seats"}
                  icon={
                    <Image
                      src={ShuttleBusIcon}
                      alt="Shuttle bus Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <Image
                      src={ShuttleBusIcon}
                      alt="Shuttle bus Icon"
                      height={50}
                      style={{
                        margin: "0.2rem",
                        color: "#000000",
                      }}
                    />
                  }
                />
              }
              label="Xe 7 chỗ"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <FormLabel
            style={{
              paddingLeft: "1rem",
              marginTop: "2rem",
            }}
          >
            Chọn loại thanh toán
          </FormLabel>
          <RadioGroup
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "2rem",
            }}
          >
            <Radio
              icon={
                <DigitalWalletIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
              checkedIcon={
                <DigitalWalletIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
            />

            <Radio
              icon={
                <PaymentIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
              checkedIcon={
                <PaymentIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
            />
            <Radio
              icon={
                <MoneyIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
              checkedIcon={
                <MoneyIcon
                  style={{
                    margin: "0.2rem",
                  }}
                />
              }
            />
          </RadioGroup>
        </FormGroup>

        <Button
          type="submit"
          style={{
            position: "fixed",
            right: "1rem",
            bottom: "2rem",
          }}
        >
          Tìm chuyến xe
        </Button>
      </FormControl>
    </StyledContainer>
  );
};

export default BookingForm;
