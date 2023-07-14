import Image from "next/image";
import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const ggMapApiKey = process.env.GGMAP_API_KEY || "AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 10.780293274142215,
  lng: 106.69906571528465
};

const MapComponent = () => {

  console.log(ggMapApiKey)

  return (
    <div
      style={{
        maxWidth: "100%",
        listStyle: "none",
        transition: "none",
        overflow: "hidden",
        height: "98vh",
      }}
    >
      <LoadScript googleMapsApiKey={ggMapApiKey || ""}>
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
