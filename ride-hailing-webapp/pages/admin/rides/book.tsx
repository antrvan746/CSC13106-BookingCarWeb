import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import mapboxgl, { LngLat } from "mapbox-gl";
import { toGeoJSON } from "@mapbox/polyline";
import extent from "turf-extent";
import { default as goongSdk } from "@goongmaps/goong-sdk"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {rideWs as RideWs} from "../../../libs/ride-ws";
import { CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/router";

const MapboxAPIKey =
  process.env.MAPBOX_API_KEY ||
  "pk.eyJ1IjoiYW50cnZhbjc0NiIsImEiOiJjbGwwdW1lb2wxcWZuM3BtemF5aWNhc21sIn0.ErBzL1xKS1JTgauuHsvsCg";

const GoongApiKey = "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe";

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
  const router = useRouter();

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const startMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const endMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [startPoint, setStart] = useState<mapboxgl.LngLat | null>(null);
  const [startAddress, setStartAddr] = useState<string | null>(null);
  const [endPoint, setEnd] = useState<mapboxgl.LngLat | null>(null);
  const [endAddress, setEndAddr] = useState<string | null>(null);

  const [bookingType, setBookingType] = useState("motorcycle");

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeFinding, setCompleteFinding] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<LngLat>(
    new mapboxgl.LngLat(106.6994168168476, 10.78109609495359)
  );

  const handleClose = () => {
    setLoading(false);
    RideWs.Close();
    setCompleteFinding(false);
    setOpen(false);
  };

  const handleSubscribe = () => {
    setLoading(true);
    if (startPoint && endPoint && startAddress && endAddress) {
      RideWs.Connect({
        user_name: "HoangLam",
        user_phone: "123456",
        user_id: "admin_user",
        slon: startPoint.lng,
        slat: startPoint.lat,
        sadr: startAddress,
        elat: endPoint.lng,
        elon: startPoint.lat,
        eadr: endAddress,
      });
    }
  };

  const routing = async (origin: LngLat, des: LngLat, typeVehicle: string) => {
    if (!mapRef.current) return;
    var layers = mapRef.current.getStyle().layers;

    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "line") {
        firstSymbolId = layers[i].id;
      }
    }
    const goongClient = goongSdk({
      accessToken: GoongApiKey,
    });
    try {
      const response = await goongClient.directions
        .getDirections({
          origin: `${origin.lat},${origin.lng}`,
          destination: `${des.lat},${des.lng}`,
          vehicle: typeVehicle,
        })
        .send();

      const directions = response.body;
      console.log(directions);
      const route = directions.routes[0];

      const distance = route.legs[0].distance.text;
      setDistance(distance);
      const duration = route.legs[0].duration.text;
      setDuration(duration);

      let data = await fetch(
        `/api/pricing?distance=${route.legs[0].distance.value / 1000
        }&estimated_time=${route.legs[0].duration.value
        }&vehicle_type=${bookingType}`
      );

      let price = await data.json();
      setPrice(Math.floor(price.price));

      const geometry_string = route.overview_polyline.points;
      const geoJSON = toGeoJSON(geometry_string);

      if (!mapRef.current.getSource("route")) {
        mapRef.current.addSource("route", {
          type: "geojson",
          data: geoJSON,
        });

        mapRef.current.addLayer(
          {
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#1e88e5",
              "line-width": 8,
            },
          },
          firstSymbolId
        );
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const unsubcribeRouting = async () => {
    if (!mapRef.current) return;

    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
    }

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeSource("route");
    }
  };

  useEffect(() => {
    unsubcribeRouting();
    if (mapRef.current && startPoint && endPoint && startPoint !== endPoint) {
      // Animate map to fit bounds.
      const bb = extent({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: startPoint.toArray(),
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: endPoint.toArray(),
            },
          },
        ],
      });

      mapRef.current.fitBounds(
        [
          [bb[0], bb[1]],
          [bb[2], bb[3]],
        ],
        {
          padding: 150,
        }
      );

      const vehicleType = bookingType === "motorcycle" ? "bike" : "car";
      routing(startPoint, endPoint, vehicleType);
    }
  }, [startPoint, endPoint, bookingType]);

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

  useEffect(() => {
    RideWs.client_listeners.onDriverFound = function (e) {
      setLoading(false);
      if (e) {
        setCompleteFinding(true);
      }
      setTimeout(() => {
        setOpen(false);
        router.replace("/admin");
      }, 3000);
    };

    return () => {
      RideWs.client_listeners.onDriverFound = undefined;
    };
  }, []);

  return (
    <>
      <Head>
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
        {/* <script src="https://unpkg.com/@goongmaps/goong-sdk/umd/goong-sdk.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js" /> */}
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
              setStartAddress={(placeName) => setStartAddr(placeName)}
              setStartPlace={(pos) => {
                setStart(pos);
                mapRef.current?.panTo(pos);
                if (mapRef.current) {
                  startMarkerRef.current?.remove();
                  startMarkerRef.current = new mapboxgl.Marker({
                    color: "#237feb",
                  })
                    .setLngLat(pos)
                    .addTo(mapRef.current);
                }
              }}
              setEndAddress={(placeName) => setEndAddr(placeName)}
              setEndPlace={(pos) => {
                setEnd(pos);
                mapRef.current?.panTo(pos);
                if (mapRef.current) {
                  endMarkerRef.current?.remove();
                  endMarkerRef.current = new mapboxgl.Marker({
                    color: "#eb3223",
                  })
                    .setLngLat(pos)
                    .addTo(mapRef.current);
                }
              }}
              setOpenDialog={() => {
                setOpen(true);
              }}
              setBookingVehicle={(vehicle) => {
                setBookingType(vehicle);
              }}
            />
          </StyledDividedContainer>
        </StyledContentContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              boxShadow: "none",
            },
          }}
        >
          <DialogTitle> Đặt chuyến xe </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>
                Dự kiến thời gian chuyến đi là {duration} <br />
                Quãng đường dự kiến dài {distance} <br />
                Chuyến đi của khách hàng hết{" "}
                {price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
                .
              </p>

              <span>
                {completeFinding ? "Đã tìm thấy tài xế cho chuyến đi" : ""}
              </span>
            </DialogContentText>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {loading && !completeFinding ? (
                <CircularProgress
                  style={{
                    marginTop: "1rem",
                    alignSelf: "center",
                  }}
                />
              ) : (
                <></>
              )}
              {completeFinding ? (
                <CheckCircle
                  fill="#13b45d"
                  style={{
                    marginTop: "1rem",
                    alignSelf: "center",
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </DialogContent>

          <DialogActions>
            {!completeFinding ? (
              <Button onClick={handleSubscribe}> Đặt xe </Button>
            ) : (
              <></>
            )}
            <Button onClick={handleClose}>
              {!completeFinding ? "Huỷ" : "Đóng"}
            </Button>
          </DialogActions>
        </Dialog>
      </StyledPageContainer>
    </>
  );
};

export default withAuth(BookingRideView);
