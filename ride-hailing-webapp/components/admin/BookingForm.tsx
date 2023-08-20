import React, { useState } from "react";
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
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";

const GoongApiKey = "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe";

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
  checkedVehicle: string;
  checkedPayment: string;
}

type BookingFormProps = {
  location: number[];
  setStartAddress: (placeName: string) => void;
  setStartPlace: (position: mapboxgl.LngLat) => void;
  setEndAddress: (placeName: string) => void;
  setEndPlace: (position: mapboxgl.LngLat) => void;
  setOpenDialog: () => void;
  setBookingVehicle: (vehicle: string) => void;
};

type AutocompletePlacesResponse = {
  predictions: PlaceInformation[];
  status: string;
};

type PlaceResponse = {
  result: PlaceResult;
  status: string;
};

type PlaceResult = {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

type AutocompletePlaceStatus = {
  value: string;
  suggestions: PlaceInformation[];
};

type PlaceInformation = {
  description: string;
  place_id: string;
};

const BookingForm = ({
  location,
  setStartAddress,
  setStartPlace,
  setEndAddress,
  setEndPlace,
  setOpenDialog,
  setBookingVehicle,
}: BookingFormProps) => {
  const [selectedVehicle, setSelectedVehicle] = React.useState("motorcycle");
  const [selectedPayment, setSelectedPayment] = React.useState("cash");

  const [autocompleteStatus, setAutocompleteStatus] =
    React.useState<AutocompletePlaceStatus>({
      value: "",
      suggestions: [],
    });

  const fetchSuggestPlaces = async (input: string) => {
    const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GoongApiKey}&location=${location[1]},${location[0]}&input=${autocompleteStatus.value}`;
    const response = await fetch(url);

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPlace = async (placeId: string) => {
    const url = `https://rsapi.goong.io/Place/Detail?place_id=${placeId}&api_key=${GoongApiKey}`;
    const response = await fetch(url);

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuggestPlaces = async (input: string) => {
    setAutocompleteStatus((prevStatus) => ({ ...prevStatus, value: input }));
    const fetchedPlaces: AutocompletePlacesResponse = await fetchSuggestPlaces(
      autocompleteStatus.value
    );

    try {
      const { predictions, status } = fetchedPlaces;
      if (status === "OK") {
        setAutocompleteStatus((prevStatus) => ({
          ...prevStatus,
          suggestions: predictions,
        }));
      } else {
        setAutocompleteStatus((prevStatus) => ({
          ...prevStatus,
          suggestions: [],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearSuggestions = () => {
    setAutocompleteStatus((prevStatus) => ({ ...prevStatus, value: "" }));
    setAutocompleteStatus((prevStatus) => ({
      ...prevStatus,
      suggestions: [],
    }));
  };

  const [formData, setFormData] = useState<BookingFormData>({
    startPlace: "",
    endPlace: "",
    firstName: "",
    lastName: "",
    phone: "",
    checkedVehicle: "motorcycle",
    checkedPayment: "cash",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const handleSelectStartPlace = async (value: string | null) => {
    const address = value;
    const place_id = autocompleteStatus.suggestions.find(
      (item) => item.description === address
    )?.place_id;

    if (place_id && address) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startPlaceId: place_id,
        startPlace: address,
      }));
    }

    if (place_id) {
      const place = (await fetchPlace(place_id)) as PlaceResponse;
      if (place.status === "OK") {
        const lng = place.result.geometry.location.lng;
        const lat = place.result.geometry.location.lat;
        setStartPlace(new mapboxgl.LngLat(lng, lat));
      }
    }
    clearSuggestions();
  };

  const handleSelectEndPlace = async (value: string | null) => {
    const address = value;
    const place_id = autocompleteStatus.suggestions.find(
      (item) => item.description == address
    )?.place_id;

    if (place_id && address) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        endPlaceId: place_id,
        endPlace: address,
      }));
    }

    if (place_id) {
      const place = (await fetchPlace(place_id)) as PlaceResponse;
      if (place.status === "OK") {
        const lng = place.result.geometry.location.lng;
        const lat = place.result.geometry.location.lat;
        setEndPlace(new mapboxgl.LngLat(lng, lat));
      }
    }
    clearSuggestions();
  };

  const handleVehicleChange = (event: any) => {
    const value: string = event.target.value;
    setSelectedVehicle(value);
    setBookingVehicle(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkedVehicle: selectedVehicle,
    }));
  };

  const handlePaymentChange = (event: any) => {
    const value: string = event.target.value;
    setSelectedPayment(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkedVPayment: selectedPayment,
    }));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    if (name == "startPlace" || "endPlace") {
      handleSuggestPlaces(value);
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
    } else if (/@"\d{10}"/g.test(formData.phone)) {
      validationErrors.phone = "Phone number is not valid";
    }
    if (Object.keys(validationErrors).length === 0) {
      try {
        setOpenDialog();
        setStartAddress(formData.startPlace);
        setEndAddress(formData.endPlace);
        console.log(formData);
        // TODO: do logic here
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
              options={autocompleteStatus.suggestions.map(
                (item) => item.description
              )}
              filterOptions={customFilterOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Điểm đi"
                  size="small"
                  name="startPlace"
                  variant="outlined"
                  value={formData.startPlace}
                  error={!!errors.startPlace}
                  onChange={handleChange}
                  helperText={errors.startPlace}
                  fullWidth
                  required
                />
              )}
              onChange={(_event, value, reason) => {
                if (reason === "selectOption") {
                  handleSelectStartPlace(value);
                }
              }}
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
              options={autocompleteStatus.suggestions.map(
                (item) => item.description
              )}
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
              onChange={(_event, value, reason) => {
                console.log(reason);
                if (reason === "selectOption") {
                  handleSelectEndPlace(value);
                }
              }}
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
            name="phone"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
          />
        </StyleInforInput>

        <FormGroup>
          <FormLabel
            style={{
              paddingLeft: "1.5rem",
              marginTop: "2rem",
            }}
          >
            Loại xe cần đặt
          </FormLabel>
          <RadioGroup
            onChange={handleVehicleChange}
            style={{
              display: "flex",
              alignSelf: "center",
              flexDirection: "row",
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
              paddingLeft: "1.5rem",
              marginTop: "2rem",
            }}
          >
            Loại thanh toán
          </FormLabel>
          <RadioGroup
            onChange={handlePaymentChange}
            style={{
              display: "flex",
              alignSelf: "center",
              flexDirection: "row",
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
