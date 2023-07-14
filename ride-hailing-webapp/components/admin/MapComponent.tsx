import Image from "next/image";
import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";



const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 10.780293274142215,
  lng: 106.69906571528465
};

const MapComponent = () => {
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
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    </div>
  );
};

export default MapComponent;
