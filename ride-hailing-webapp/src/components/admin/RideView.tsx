import styled from "styled-components";
import React from "react";
import { Divider } from "@mui/material";


const StyledText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.01rem 1fr;
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
      <StyledText> <span> Điểm đi </span> </StyledText>
      <Divider />
      <StyledText> <span> Điểm đến </span> </StyledText>
		</StyledContainer>
	);
};

export default RideView;
