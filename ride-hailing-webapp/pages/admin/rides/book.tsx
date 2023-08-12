import AdminHeader from "../../../components/admin/AdminHeader";
import BookingForm from "../../../components/admin/BookingForm";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import withAuth from "../../_withAuth";
import mapboxgl, { LngLat } from "mapbox-gl";
import { toGeoJSON } from "@mapbox/polyline";
import extent from "turf-extent";

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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const startMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const endMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [startPoint, setStart] = useState<mapboxgl.LngLat | null>(null);
  const [endPoint, setEnd] = useState<mapboxgl.LngLat | null>(null);

  const [currentLocation, setCurrentLocation] = useState<LngLat>(
    new mapboxgl.LngLat(106.6994168168476, 10.78109609495359)
  );

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
          origin: `${startPoint?.lat},${startPoint?.lng}`,
          destination: `${endPoint?.lat},${endPoint?.lng}`,
          vehicle: typeVehicle,
        })
        .send();

      const directions = response.body;
      const route = directions.routes[0];
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

      mapRef.current.fitBounds([
        [bb[0], bb[1]],
        [bb[2], bb[3]],
      ], {
        padding: 150
      });

      routing(startPoint, endPoint, "car");
    }
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
        <script src="https://unpkg.com/@goongmaps/goong-sdk/umd/goong-sdk.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js" />
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
            />
          </StyledDividedContainer>
        </StyledContentContainer>
      </StyledPageContainer>
    </>
  );
};

export default withAuth(BookingRideView);
