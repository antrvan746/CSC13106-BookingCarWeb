import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import MapComponent from "../../../components/admin/MapComponent";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import { LoadScript } from "@react-google-maps/api";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
`;

const ggMapApiKey =
  process.env.GGMAP_API_KEY || "AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A";

const BookingRideView = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
      </Head>
      <AdminHeader />
      <LoadScript googleMapsApiKey={ggMapApiKey} libraries={["places"]}>
        <StyledContentContainer>
          <MapComponent />

          <StyledDividedContainer>
            <BookingForm />
          </StyledDividedContainer>
        </StyledContentContainer>
      </LoadScript>
    </StyledPageContainer>
  );
};

export default BookingRideView;
