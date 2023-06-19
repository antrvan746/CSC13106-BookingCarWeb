import styled from "styled-components";
import React from "react";
import { Divider } from "@mui/material";


const StyledText = styled.span`
  color: #000000;
`


const StyledContainer = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #efefef;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;  
`


const RideView = () => {
	return (
		<StyledContainer>
      <StyledText> Điểm đi </StyledText>
      <Divider />
      <StyledText> Điểm đến </StyledText>
		</StyledContainer>
	);
};

export default RideView;
