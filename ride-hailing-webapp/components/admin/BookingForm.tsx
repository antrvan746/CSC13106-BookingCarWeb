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
  Autocomplete,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";

import MotorcycleIcon from "@mui/icons-material/TwoWheeler";
import SedanIcon from "@mui/icons-material/DirectionsCar";
import ShuttleBusIcon from "@mui/icons-material/AirportShuttle";

import CashIcon from "@mui/icons-material/Money";
import CardIcon from "@mui/icons-material/CreditCard";
import EWalletIcon from "@mui/icons-material/Wallet";
import { LngLatLike, Marker } from "mapbox-gl";
import { UUID, randomUUID } from "crypto";

const GoongApiKey =
  process.env.API_GOONG_KEY || "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe";

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
  // date: Dayjs | null;
  checkedVehicle: string;
  checkedPayment: string;
}

type BookingFormProps = {
  startPlace: Marker;
  endPlace: Marker;
};

type AutocompletePlaceStatus = {
  value: string;
  sessionToken: string;
  predictions: PlaceInformation[];
  status: string;
};

type PlaceInformation = {
  descriptions: string;
  place_id: string;
};

const BookingForm = () => {
  const [selectedVehicle, setSelectedVehicle] = React.useState("motorcycle");
  const [selectedPayment, setSelectedPayment] = React.useState("cash");
  // const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjsFunc());

  const [autocompleteStatus, setAutocompleteStatus] =
    React.useState<AutocompletePlaceStatus>({
      value: "",
      sessionToken: randomUUID(),
      predictions: [],
      status: "WAITING",
    });

  const handleSuggestPlaces = async (value: string) => {
    const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?${GoongApiKey}`);
  };

  const clearSuggestions = () => {};

  const [formData, setFormData] = useState<BookingFormData>({
    startPlace: "",
    endPlace: "",
    firstName: "",
    lastName: "",
    phone: "",
    // date: null,
    checkedVehicle: "",
    checkedPayment: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // const handleSelectStartPlace = async (event: any) => {
  //   const val = event.target.value;
  //   setValue(val, false);
  //   clearSuggestions();

  //   const results = await getGeocode({address: val});
  //   const { lat, lng} = await getLatLng(results[0]);
  //   console.log(lat, lng);
  //   setStartPlace({lat, lng});
  // }

  // const handleSelectEndPlace = async (event: any) => {
  //   const val = event.target.value;
  //   setValue(val, false);
  //   clearSuggestions();

  //   const results = await getGeocode({address: val});
  //   const { lat, lng} = await getLatLng(results[0]);
  //   setStartPlace({lat, lng});
  // }

  const handleVehicleChange = (event: any) => {
    console.log(event.target.value);
    setSelectedVehicle(event.target.value);
  };

  const handlePaymentChange = (event: any) => {
    console.log(event.target.value);
    setSelectedPayment(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    if (name == "startPlace" || "endPlace") {
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

    if (Object.keys(validationErrors).length === 0) {
      try {
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
              // options={data.map((suggestion) => suggestion.description)}
              options={[]}
              filterOptions={customFilterOptions}
              // onSelect={handleSelectStartPlace}
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
              // options={data.map((suggestion) => suggestion.description)}
              options={[]}
              filterOptions={customFilterOptions}
              // onSelect={handleSelectEndPlace}
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

        {/* <StyleInforInput>
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
        </StyleInforInput> */}

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
                    <MotorcycleIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <MotorcycleIcon
                      fill="#13b45d"
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
                    <SedanIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <SedanIcon
                      fill="#13b45d"
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
                    <ShuttleBusIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <ShuttleBusIcon
                      fill="#13b45d"
                      style={{
                        margin: "0.2rem",
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
            Loại thanh toán
          </FormLabel>
          <RadioGroup
            onChange={handlePaymentChange}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "2rem",
            }}
          >
            <FormControlLabel
              value="cash"
              control={
                <Radio
                  checked={selectedPayment === "cash"}
                  icon={
                    <CashIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <CashIcon
                      fill="#13b45d"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  disableRipple
                />
              }
              label="Tiền mặt"
              labelPlacement="bottom"
            />

            <FormControlLabel
              value="card"
              control={
                <Radio
                  checked={selectedPayment === "card"}
                  icon={
                    <CardIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <CardIcon
                      fill="#13b45d"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                />
              }
              label="Thẻ"
              labelPlacement="bottom"
            />

            <FormControlLabel
              value="e_wallet"
              control={
                <Radio
                  checked={selectedPayment === "e_wallet"}
                  icon={
                    <EWalletIcon
                      fill="#000000"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                  checkedIcon={
                    <EWalletIcon
                      fill="#13b45d"
                      style={{
                        margin: "0.2rem",
                      }}
                    />
                  }
                />
              }
              label="Ví điện tử"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormGroup>

        <Button
          type="submit"
          style={{
            width: "50%",
            marginTop: "2rem",
            marginBottom: "1rem",
            alignSelf: "end",
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
