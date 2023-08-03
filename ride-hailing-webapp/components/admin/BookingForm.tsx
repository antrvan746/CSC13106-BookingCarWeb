import React, { ChangeEvent, useState } from "react";
import dayjsFunc, { Dayjs } from "dayjs";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  FormGroup,
  Button,
  FilterOptionsState,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MotorcycleIcon from "../../assets/motorcycle.png";
import SedanIcon from "../../assets/sedan.png";
import ShuttleBusIcon from "../../assets/shuttlebus.png";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DigitalWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/Money";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import usePlacesAutocomplete from "use-places-autocomplete";


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
  width: 100%;
`;

const StyleInforInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface BookingFormData {
  startPlace: string;
  endPlace: string;
  firstName: string;
  lastName: string;
  phone: string;
  date: Dayjs | null;
  checkedVehicle: string;
  checkedPayment: string;
}

interface PlaceInfoResponse {
  lat: string;
  lon: string;
  display_name: string;
  display_address: string;
}

const LOCATION_IQ_KEY =
  process.env.LOCATION_IQ_TOKEN || "pk.b5db726701a914af3d4f2e075b07dabb";

const BookingForm = () => {
  const [selectedVehicle, setSelectedVehicle] = React.useState("motorcycle");
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjsFunc());


  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [formData, setFormData] = useState<BookingFormData>({
    startPlace: "",
    endPlace: "",
    firstName: "",
    lastName: "",
    phone: "",
    date: null,
    checkedVehicle: "",
    checkedPayment: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const handleVehicleChange = (event: any) => {
    console.log(event.target.value);
    setSelectedVehicle(event.target.value);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    if (name == "startPlace") {
      setValue(value);
    } else if (name == "endPlace") {
      setValue(value);
    }
  };

  const handleSubmit = async () => {
    const validationErrors: Partial<BookingFormData> = {};

    if (!formData.startPlace.trim()) {
      validationErrors.startPlace = "Start place is required";
    }
    if (!formData.endPlace.trim()) {
      validationErrors.endPlace = "End place is required";
    }
    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone is required";
    } else if (
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(formData.phone)
    ) {
      validationErrors.phone = "Phone number is not valid";
    }

    if (formData.date?.isAfter(formData.date)) {
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        clearSuggestions();
        setValue("");
      } catch (err) {}
    } else {
      setErrors(validationErrors);
    }
  };

  const customFilterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    return options;
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
          <div
            style={{
              width: "100%",
            }}
          >
            <Autocomplete
              freeSolo
              options={data.map((suggestion) => suggestion.description)}
              filterOptions={customFilterOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Điểm đi"
                  size="small"
                  name="startPlace"
                  variant="outlined"
                  value={formData.startPlace}
                  onChange={handleChange}
                  error={!!errors.startPlace}
                  helperText={errors.startPlace}
                  fullWidth
                  required
                />
              )}
            />
          </div>
        </StyledPlaceInput>

        <StyledPlaceInput>
          <PlaceIcon
            style={{
              fill: "#EB3223",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <div
            style={{
              width: "100%",
            }}
          >
            <Autocomplete
              freeSolo
              options={data.map((suggestion) => suggestion.description)}
              filterOptions={customFilterOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Điểm đến"
                  size="small"
                  name="endPlace"
                  variant="outlined"
                  value={formData.startPlace}
                  onChange={handleChange}
                  error={!!errors.startPlace}
                  helperText={errors.startPlace}
                  fullWidth
                  required
                />
              )}
            />
          </div>
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
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
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
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
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
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
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
          onClick={handleSubmit}
        >
          Tìm chuyến xe
        </Button>
      </FormControl>
    </StyledContainer>
  );
};

export default BookingForm;
