import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

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
  process.env.GGMAP_API_KEY || "AIzaSyA3iUAcVdOPHmYXE8LM2dj5OmSPbTDO0SM";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 10.780293274142215,
  lng: 106.69906571528465,
};

const BookingRideView = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
      </Head>
      <AdminHeader />
      <LoadScript
        googleMapsApiKey={ggMapApiKey}
        libraries={["places", "geometry"]}
      >
        <StyledContentContainer>
          <div
            style={{
              maxWidth: "100%",
              listStyle: "none",
              transition: "none",
              overflow: "hidden",
              height: "98vh",
            }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
            </GoogleMap>
          </div>

          <StyledDividedContainer>
            <BookingForm />
          </StyledDividedContainer>
        </StyledContentContainer>
      </LoadScript>
    </StyledPageContainer>
  );
};

export default withAuth(BookingRideView);
