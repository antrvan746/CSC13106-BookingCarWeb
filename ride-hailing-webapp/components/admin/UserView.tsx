import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import RideHistoryView from "./RideHistoryView";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin: 3rem 2rem 2rem 0.5rem;
`;

const StyledText = styled.span`
  font-weight: bold;
  font-size: large;
  margin-top: 10px;
`;

const StyledRecentRidesText = styled.span`
  font-weight: bold;
  font-size: medium;
`;

const StyledUserName = styled.span`
  font-weight: normal;
  font-size: medium;
`;

const StyledUserInfoContainer = styled.div`
  align-self: center;
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyledInfoRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-column-gap: 10px;
  padding: 3px;
  width: 100%;
  z-index: 1;
`;

const StyledInfoLabel = styled.span`
  font-weight: bold;
`;

const StyledInfoContent = styled.span``;

const StyledRecentRidesContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
`;

const StyledRideHistoriesContainer = styled.div`
  overflow-y: scroll;
  max-height: 300px;
`;

const UserView = () => {
  return (
    <StyledContainer>
      <StyledText> Thông tin khách hàng </StyledText>

      <Avatar sx={{ width: 100, height: 100, margin: "1rem" }} />

      <StyledUserName> Tên tài khoản </StyledUserName>

      <StyledUserInfoContainer>
        <StyledInfoRow>
          <StyledInfoLabel> Số điện thoại </StyledInfoLabel>
          <StyledInfoContent> 0983 741 587 </StyledInfoContent>
        </StyledInfoRow>

        <StyledInfoRow>
          <StyledInfoLabel> Email </StyledInfoLabel>
          <StyledInfoContent> tmt@gmail.com </StyledInfoContent>
        </StyledInfoRow>

        <StyledInfoRow>
          <StyledInfoLabel> Đánh giá </StyledInfoLabel>
          <StyledInfoContent> ⭐ ⭐ ⭐ ⭐ ⭐ </StyledInfoContent>
        </StyledInfoRow>
      </StyledUserInfoContainer>

      <StyledRecentRidesContainer>
        <StyledRecentRidesText> Các chuyến đi gần đây </StyledRecentRidesText>

        <StyledRideHistoriesContainer>
          <RideHistoryView />
          <RideHistoryView />
          <RideHistoryView />
		  <RideHistoryView />
		  <RideHistoryView />
          <RideHistoryView />
          <RideHistoryView />
		  <RideHistoryView />
        </StyledRideHistoriesContainer>
      </StyledRecentRidesContainer>
    </StyledContainer>
  );
};

export default UserView;