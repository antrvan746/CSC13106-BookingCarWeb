import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import { GoogleMap } from "@react-google-maps/api";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
`;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 10.780293274142215,
  lng: 106.69906571528465,
};

const RideDetailView = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
      </Head>
      <AdminHeader />
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
          ></GoogleMap>
        </div>

        <StyledDividedContainer>
          <BookingForm />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledPageContainer>
  );
};

export default withAuth(RideDetailView);
