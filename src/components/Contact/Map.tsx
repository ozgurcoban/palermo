"use client";

import React, { useState } from "react";

function Map() {
  const [isInteractive, setIsInteractive] = useState(false);

  const handleOverlayClick = () => {
    setIsInteractive(true);
  };

  return (
    <div className="relative h-[500px] w-full">
      <iframe
        title="Central bagdad karta"
        src="https://maps.google.com/maps?q=Sysslomansgatan%207,%20753%2011%20Uppsala&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: isInteractive ? "auto" : "none" }}
        allowFullScreen
        loading="lazy"
      />
      {!isInteractive && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
            // Öppen färg, eventuellt med låg opacitet för att visa att kartan är inaktiv
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
      )}
    </div>
  );
}

export default React.memo(Map);
