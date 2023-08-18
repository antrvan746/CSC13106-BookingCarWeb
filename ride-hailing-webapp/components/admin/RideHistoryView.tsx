import styled from "styled-components";
import React from "react";
import { Divider } from "@mui/material";
import Image from "next/image";
import MotorcycleIcon from "../../assets/motorcycle.png";
import SedanIcon from "../../assets/sedan.png";
import VanIcon from "../../assets/shuttlebus.png";

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
`;

interface RideHistoryViewProps {
  vehicleType: string;
  startPlaceName: string;
  endPlaceName: string;
  fee: number;
}

interface VehicleTypeProps {
  vehicleType: string;
}

const VehicleImage: React.FC<VehicleTypeProps> = (props) => {
  const { vehicleType } = props;

  if (vehicleType == "4-seats") {
    return <Image src={SedanIcon} alt="Vehicle icon" width={40} />;
  } else if (vehicleType == "7-seats") {
    return <Image src={VanIcon} alt="Vehicle icon" width={40} />;
  } else {
    return <Image src={MotorcycleIcon} alt="Motorcycle icon" width={40} />;
  }
};

const RideHistoryView: React.FC<RideHistoryViewProps> = (props) => {
  const { vehicleType, startPlaceName, endPlaceName, fee } = props;
  return (
    <StyledContainer>
      <StyledGridItemContainer>
        <VehicleImage vehicleType={vehicleType} />
      </StyledGridItemContainer>

      <StyledGridItemContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: "small",
                textAlign: "left",
              }}
            >
              {`${startPlaceName}`}
            </span>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: "small",
                textAlign: "left",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {`${endPlaceName}`}
            </span>
          </div>
        </div>
      </StyledGridItemContainer>

      <StyledGridItemContainer>
        <span
          style={{ fontSize: "small", fontWeight: "bold" }}
        >{`${fee.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}`}</span>
      </StyledGridItemContainer>
    </StyledContainer>
  );
};

export default RideHistoryView;
