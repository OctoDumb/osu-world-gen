import React from "react";
import {
  GeoJSON as GeoJson,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import { LatLng, LatLngBounds, svg } from "leaflet";
import styles from "./index.module.scss";

const maxBounds = new LatLngBounds(
  new LatLng(90, -192),
  new LatLng(-60, 196)
);

const MapInner = () => {
  const map = useMap();

  return null;
};

const Map = () => {
  return (
    <MapContainer
      className={styles.map}
      maxBounds={maxBounds}
      maxBoundsViscosity={0.75}
      center={[63.63, 99.49]}
      zoom={4}
      zoomControl={false}
      renderer={svg({ padding: 1 })}
    >
      <TileLayer
        className={styles.layer}
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapInner/>
    </MapContainer>
  );
};

export default Map;
