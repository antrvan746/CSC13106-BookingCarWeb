import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  height: 100%;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const ggMapApiKey =
  process.env.GGMAP_API_KEY || "AIzaSyA3iUAcVdOPHmYXE8LM2dj5OmSPbTDO0SM";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 10.780293274142215,
  lng: 106.69906571528465,
};

const BookingRideView = () => {
  const [startPlace, setStartPlace] = useState<LatLngLiteral>();
  const [endPlace, setEndPlace] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const mapRef = useRef<google.maps.Map>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 10.780293274142215, lng: 106.69906571528465 }),
    []
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => (mapRef.current = map),
    []
  );

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
              height: "100%",
            }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              // onLoad={onLoad}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      zIndex: 50,
                      strokeColor: "#1976D2",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}

              {startPlace && endPlace && (
                <>
                  <Marker
                    position={startPlace}
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  />
                  <Marker
                    position={endPlace}
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  />
                </>
              )}
            </GoogleMap>
          </div>

          <StyledDividedContainer>
            <BookingForm
              setStartPlace={setStartPlace}
              setEndPlace={setEndPlace}
            />
          </StyledDividedContainer>
        </StyledContentContainer>
      </LoadScript>
    </StyledPageContainer>
  );
};

export default withAuth(BookingRideView);
