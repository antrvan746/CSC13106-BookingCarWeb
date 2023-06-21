import AdminHeader from "@/components/admin/AdminHeader";
import BookingForm from "@/components/admin/BookingForm";
import MapComponent from "@/components/admin/MapComponent";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
`;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
`;

const BookingRideView = () => {
  return (
    <StyledContainer>
      <AdminHeader />
      <StyledContentContainer>
        <MapComponent />

        <StyledDividedContainer>
          <BookingForm />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default BookingRideView;
