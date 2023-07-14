import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import MapComponent from "../../../components/admin/MapComponent";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";

const StyledPageContainer = styled.div`
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
    <StyledPageContainer>
      <Head> 
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A&callback=initMap"></script>
      </Head>
      <AdminHeader />
      <StyledContentContainer>
        <MapComponent />

        <StyledDividedContainer>
          <BookingForm />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledPageContainer>
  );
};

export default withAuth(BookingRideView);
