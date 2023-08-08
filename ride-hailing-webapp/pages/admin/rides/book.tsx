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
import mapboxgl, { LngLat, LngLatLike, accessToken } from "mapbox-gl";

const MapboxAPIKey =
  process.env.MAPBOX_API_KEY ||
  "pk.eyJ1IjoiYW50cnZhbjc0NiIsImEiOiJjbGwwdW1lb2wxcWZuM3BtemF5aWNhc21sIn0.ErBzL1xKS1JTgauuHsvsCg";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  height: 95vh;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const BookingRideView = () => {
  const mapRef = useRef<mapboxgl.Map>(null);

  const [currentLocation, setCurrentLocation] = useState<LngLat>(
    new mapboxgl.LngLat(106.6994168168476, 10.78109609495359)
  );

  useEffect(() => {
    // Get user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(new mapboxgl.LngLat(longitude, latitude));
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    mapboxgl.accessToken = MapboxAPIKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: currentLocation,
      zoom: 13,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: "red" }).setLngLat(currentLocation).addTo(map);

    new mapboxgl.Marker({ color: "red" })
      .setLngLat(new mapboxgl.LngLat(105.85245053068172, 21.03091278748681))
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [currentLocation]);


  const fit = () => {
    map.fitBounds([
      [32.958984, -5.353521], // southwestern corner of the bounds
      [43.50585, 5.615985], // northeastern corner of the bounds
    ]);
  }

  return (
    <StyledPageContainer>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
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
          <button
            id="fit"
            onClick={}
            style={{
              display: "block",
              position: "relative",
              margin: "0px auto",
              width: "50%",
              height: "40px",
              padding: "10px",
              border: "none",
              borderRadius: "3px",
              fontSize: "12px",
              textAlign: "center",
              color: "#fff",
              background: "#ee8a65",
            }}
          >
            Fit to Kenya
          </button>
        </div>

        <StyledDividedContainer>
          <BookingForm location={currentLocation.toArray()} />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledPageContainer>
  );
};

export default withAuth(BookingRideView);
