import styled from "styled-components";
import React from "react";
import { Divider } from "@mui/material";
import Image from "next/image";
import SedanIcon from "../../../assets/sedan.png";

const StyledContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 4fr 1.25fr;
  width: 100%;
  height: 5rem;
  background-color: #efefef;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const StyledGridItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RideHistoryView = () => {
  return (
    <StyledContainer>
      <StyledGridItemContainer>
        <Image src={SedanIcon} alt="Vehicle icon" width={40} />
      </StyledGridItemContainer>

      <StyledGridItemContainer>
        <span style={{  fontSize:"small" }}>
          Chuyến đi đến Ga Quốc Nội (B3) - Sân bay Nội Bài, Sóc Sơn, Việt Nam
        </span>
      </StyledGridItemContainer>

      <StyledGridItemContainer>
        <span style={{ fontSize: "small", fontWeight: "bold" }}>
          175.000d
        </span>
      </StyledGridItemContainer>
    </StyledContainer>
  );
};

export default RideHistoryView;
