import React from "react";
import Image from "next/image";

const MapComponent = () => {
  return (
    <div
      style={{
        maxWidth: "100%",
        listStyle: "none",
        transition: "none",
        overflow: "hidden",
        height: "98vh"
      }}
    >
      <div
        id="display-google-map"
        style={{ height: "100%", width: "100%", maxWidth: "100%" }}
      >
        <iframe
          style={{ height: "100%", width: "100%", border: 0 }}
          src="https://www.google.com/maps/embed/v1/place?q=Nhà+thờ+Đức+Bà,+Công+xã+Paris,+Bến+Nghé,+Quận+1,+Thành+phố+Hồ+Chí+Minh,+Việt+Nam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
