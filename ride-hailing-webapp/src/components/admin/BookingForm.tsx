import React from "react";
import styled from "styled-components";
import {
	Box,
	Container,
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
} from "@mui/material";
import MotorcycleIcon from "../../../assets/motorcycle.png";
import SedanIcon from "../../../assets/sedan.png";
import ShuttleBusIcon from "../../../assets/shuttlebus.png";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledPlaceInput = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const BookingForm = () => {
	const [age, setAge] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
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
						margin="normal"
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

				<FormLabel
					style={{
						paddingLeft: "1rem",
						marginTop: "2rem",
					}}
				>
					{" "}
					Loại xe cần đặt{" "}
				</FormLabel>
				<RadioGroup
					style={{
						display: "flex",
						flexDirection: "row",
						paddingLeft: "2rem",
					}}
				>
					<FormControlLabel
						value="motorcycle"
						control={<Radio />}
						label={
							<>
								<Image
									src={MotorcycleIcon}
									alt="Motorcycle icon"
									height={50}
								/>
							</>
						}
					/>
					<FormControlLabel
						value="4seat"
						control={<Radio />}
						label={
							<>
								<Image
									src={SedanIcon}
									alt="Sedan icon"
									height={50}
								/>
							</>
						}
					/>
					<FormControlLabel
						value="7seat"
						control={<Radio />}
						label={
							<>
								<Image
									src={SedanIcon}
									alt="Sedan icon"
									height={50}
								/>
							</>
						}
					/>
				</RadioGroup>

				<div>
					<InputLabel id="">Age</InputLabel>
					<Select
						labelId="demo-select-small-label"
						id="demo-select-small"
						value={age}
						label="Age"
						onChange={handleChange}
						style={{ marginTop: "2rem" }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>VISA</MenuItem>
						<MenuItem value={20}>MOMO</MenuItem>
						<MenuItem value={30}>BANKING</MenuItem>
						<MenuItem value={40}>CASH</MenuItem>
					</Select>
				</div>
			</FormControl>
		</StyledContainer>
	);
};

export default BookingForm;
