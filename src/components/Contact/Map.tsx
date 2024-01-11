"use client";

import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "30rem",
};
const center = {
  lat: 59.860096 - 0.0002,
  lng: 17.6305953,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function Map() {
  const handleMarkerClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, "_blank");
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey as string,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="cursor-pointer">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        options={{ draggable: false, mapId: "330578b92517eac7" }}
      >
        <Marker
          position={center}
          icon={{
            url: "/logo.png",
            scaledSize: new google.maps.Size(50, 50),
          }}
          onClick={handleMarkerClick}
        />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
