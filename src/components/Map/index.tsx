import React from "react";
import {
  GeoJSON as GeoJson,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import { LatLng, LatLngBounds, svg } from "leaflet";
import styles from "./index.module.scss";
import { useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";

const maxBounds = new LatLngBounds(
  new LatLng(90, -192),
  new LatLng(-60, 196)
);

const MapInner = () => {
  const map = useMap();

  return null;
};

const Map = () => {
  const [regions] = useRegionsStore(
    (state) => [state.data],
    shallow
  );

  console.log(regions, "regions");

  const renderGeoJsons = () => regions.map((item, index) => {
    if (!item.data) {
      return null;
    }

    // TODO: add working GEOJSON
    // return (
    //   <GeoJson
    //     key={`region-${index}-${item.id}`}
    //     data={item.data}
    //     style={(f) => ({
    //       fillColor: "#2D3748",
    //       weight: 2,
    //       opacity: 0.3,
    //       color: "white",
    //       dashArray: "3",
    //       fillOpacity: 0.23,
    //     })}
    //   />
    // );

    // TODO: remove after upper todo
    return null;
  }).filter(Boolean);

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
      {renderGeoJsons()}
      <MapInner/>
    </MapContainer>
  );
};

export default Map;
