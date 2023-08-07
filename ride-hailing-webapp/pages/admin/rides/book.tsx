import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import mapboxgl, { LngLatLike, accessToken } from "mapbox-gl";

const MapboxAPIKey =
  process.env.MAPBOX_API_KEY ||
  "pk.eyJ1IjoiYW50cnZhbjc0NiIsImEiOiJjbGwwdW1lb2wxcWZuM3BtemF5aWNhc21sIn0.ErBzL1xKS1JTgauuHsvsCg";

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

const BookingRideView = () => {
  const [currentLocation, setCurrentLocation] = useState<LngLatLike>([
    -74.5, 40,
  ] as LngLatLike);

  useEffect(() => {
    // Get user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    mapboxgl.accessToken = MapboxAPIKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: currentLocation,
      zoom: 12,
      attributionControl: false,
    });
    new mapboxgl.Marker({ color: "red" }).setLngLat(currentLocation).addTo(map);
    
    return () => {
      map.remove();
    };
  }, [currentLocation]);

  return (
    <StyledPageContainer>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <AdminHeader />
      <StyledContentContainer>
        <div
          style={{
            maxWidth: "100%",
            overflow: "hidden"
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
          <BookingForm />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledPageContainer>
  );
};

export default withAuth(BookingRideView);
