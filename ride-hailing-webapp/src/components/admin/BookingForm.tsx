import React from "react";
import styled from "styled-components";
import {
	Box,
	Container,
	FormControl,
	FormLabel,
	RadioGroup,
	TextField,
} from "@mui/material";
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

				<FormControl>
					<FormLabel> Loai xe can dat </FormLabel>
					<RadioGroup></RadioGroup>
				</FormControl>
			</FormControl>
		</StyledContainer>
	);
};

export default BookingForm;
