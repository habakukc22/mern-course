import React, { useRef } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    >
      This should be a map with the center: {JSON.stringify(center)} and the
      zoom: {zoom}
    </div>
  );
};

export default Map;
