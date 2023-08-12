import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import mapboxgl, { LngLat, LngLatLike, accessToken } from "mapbox-gl";

const MapboxAPIKey =
  process.env.MAPBOX_API_KEY ||
  "pk.eyJ1IjoiYW50cnZhbjc0NiIsImEiOiJjbGwwdW1lb2wxcWZuM3BtemF5aWNhc21sIn0.ErBzL1xKS1JTgauuHsvsCg";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  height: 100vh;
`;

const StyledDividedContainer = styled.div`
  width: 100%;

  .example::-webkit-scrollbar {
    display: none;
  }
`;

const BookingRideView = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [startPoint, setStart] = useState<mapboxgl.LngLat | null>(null);
  const [endPoint, setEnd] = useState<mapboxgl.LngLat | null>(null);

  const [currentLocation, setCurrentLocation] = useState<LngLat>(
    new mapboxgl.LngLat(106.6994168168476, 10.78109609495359)
  );

  useEffect(() => {
    // Get user's current location using the Geolocation API
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    mapboxgl.accessToken = MapboxAPIKey;

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: currentLocation,
      zoom: 13,
      attributionControl: false,
    });

    if (mapRef.current) {
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    return () => {
      mapRef.current?.remove();
    };
  }, [currentLocation]);

  return (
    <>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <StyledPageContainer>
        <AdminHeader />
        <StyledContentContainer>
          <div
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              id="map"
              style={{
                height: "100%",
              }}
            ></div>
          </div>

          <StyledDividedContainer>
            <BookingForm
              location={currentLocation.toArray()}
              setStartPlace={(pos) => {
                setStart(pos);
                console.log("Setstart",pos);
                mapRef.current?.panTo(pos);

                if (mapRef.current) {
                  new mapboxgl.Marker({ color: "#237feb" })
                    .setLngLat(pos)
                    .addTo(mapRef.current);
                }
                console.log(startPoint);
              }}
              setEndPlace={(pos) => {
                setEnd(pos);
                console.log("Set end",pos);
                mapRef.current?.panTo(pos);
                if (mapRef.current) {
                  new mapboxgl.Marker({ color: "#eb3223" })
                    .setLngLat(pos)
                    .addTo(mapRef.current);
                }
                console.log(endPoint);
              }}
            />
          </StyledDividedContainer>
        </StyledContentContainer>
      </StyledPageContainer>
    </>
  );
};

export default withAuth(BookingRideView);
