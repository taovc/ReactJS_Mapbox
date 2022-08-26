import React, { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapbox.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGFvemVpIiwiYSI6ImNsNzd3M3M1YTAzd3YzcG5na3NyOXNkMWcifQ.pDSjn-lx6bms-cwHg-K5mw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [2.034084142948, 48.909671288923],
  zoom: 13,
});

const datas = [
  {
    _id: "6308c14748d0ecd43f23fe97",
    name: "wassss",
    description: "ffffff",
    type: "Collectivité",
    lat: 48.9,
    lng: 2.349014,
    __v: 0,
  },
  {
    _id: "6308c805476d90d7705ffd9c",
    name: "ttt",
    description: "tttt",
    type: "Entreprise",
    lat: 48.891563590018336,
    lng: 2.4798848426348172,
    __v: 0,
  },
];

datas.forEach((store, i) => {
  store.id = i;
});

map.on("load", () => {
  map.addSource("places", {
    type: "geojson",
    data: datas,
  });
  buildLocationList(datas);
  addMarkers();
});

export function addMarkers() {
  for (const marker of datas) {
    const el = document.createElement("div");
    el.id = `marker-${marker.id}`;
    el.className = "marker";

    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat([marker.lng, marker.lat])
      .addTo(map);

    el.addEventListener("click", (e) => {
      flyToStore(marker);
      createPopUp(marker);
      const activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(`listing-${marker.id}`);
      listing.classList.add("active");
    });
  }
}

export function buildLocationList(datas) {
  for (const store of datas) {
    const listings = document.getElementById("listings");
    const listing = listings.appendChild(document.createElement("div"));
    listing.id = `listing-${store.id}`;
    listing.className = "item";

    const link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.id = `link-${store.id}`;
    link.innerHTML = `${store.name}`;

    link.addEventListener("click", function () {
      for (const feature of datas) {
        if (this.id === `link-${feature.id}`) {
          flyToStore(feature);
          createPopUp(feature);
        }
      }
      const activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  }
}

export function flyToStore(currentFeature) {
  map.flyTo({
    center: [currentFeature.lng, currentFeature.lat],
    zoom: 15,
  });
}

export function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([currentFeature.lng, currentFeature.lat])
    .setHTML(
      `<h3>${currentFeature.name}</h3><h4>${currentFeature.description}</h4><h4>${currentFeature.type}</h4>`
    )
    .addTo(map);
}
