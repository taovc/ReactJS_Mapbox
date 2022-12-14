import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ListUsers, CreateUser } from "./ListDatas.jsx";
import AddForm from "./AddForm.jsx";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGFvemVpIiwiYSI6ImNsNzd3M3M1YTAzd3YzcG5na3NyOXNkMWcifQ.pDSjn-lx6bms-cwHg-K5mw";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.349014);
  const [lat, setLat] = useState(48.9);
  const [zoom, setZoom] = useState(12);
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", (e) => {
      // if click , open the window
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      setOpen(true);
    });
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div ref={mapContainer} className="map-container" />
      <div style={{ marginLeft: "290px", marginTop: "40px" }}>
        <CreateUser setOpen={setOpen} />
        <ListUsers // show all user's info
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          setLat={setLat}
          setLng={setLng}
        />
      </div>
      {open && ( // if windows is open, then add user infomation
        <AddForm
          setOpen={setOpen}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      )}
    </div>
  );
}
