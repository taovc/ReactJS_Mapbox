import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ListDatas from "./ListDatas.jsx";
import AddForm from "./AddForm.jsx";
import "./AddForm.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGFvemVpIiwiYSI6ImNsNzd3M3M1YTAzd3YzcG5na3NyOXNkMWcifQ.pDSjn-lx6bms-cwHg-K5mw";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.349014);
  const [lat, setLat] = useState(48.9);
  const [zoom, setZoom] = useState(12);
  const [open, setOpen] = useState(false);

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
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      setOpen(true);
    });
  });

  return (
    <div>
      <ListDatas setOpen={setOpen} />
      {open && (
        <AddForm
          setOpen={setOpen}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      )}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}