import React, { FC, memo, useRef } from "react";
import {
  GeoJSON as GeoJson,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import { LatLng, LatLngBounds, svg } from "leaflet";
import styles from "./index.module.scss";
import { RegionItem, useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";
import { useHoverStore } from "@components/store/hoverStore";

const maxBounds = new LatLngBounds(
  new LatLng(90, -192),
  new LatLng(-60, 196)
);

const MapInner = () => {
  const map = useMap();

  return null;
};

type RegionProps = { item: RegionItem };

const Region: FC<RegionProps> = memo(({ item }) => {
  const ref = useRef<any>();

  const setContent = useHoverStore((state) => state.setContent);

  if(!item.data)
    return null;

  return (
    <GeoJson
      ref={ref}
      key={`geojson-${item.id}`}
      data={item.data}
      style={(_) => ({
        fillColor: item.loading ? "#dfff4f" : "#4FC0FF",
        weight: 2,
        opacity: 0.5,
        color: "white",
        dashArray: "1",
        fillOpacity: 0.2,
      })}
      onEachFeature={(_, l) => {
        l.on({
          mouseover: (e) => {
            e.target.setStyle({
              weight: 2,
              dashArray: "",
              fillOpacity: 0.7
            });
            e.target.bringToFront();
            setContent(item.id);
          },
          mouseout: (e) => {
            ref.current!.resetStyle(e.target);
            setContent("");
          },
          click: () => {
            console.log(item.data.properties.names);
          },
        });
      }}
    />
  );
});

const Map = () => {
  const [regions] = useRegionsStore(
    (state) => [state.data],
    shallow
  );

  const renderGeoJsons = () => regions.map((item, index) => (<Region key={`region-${item.id}`} item={item} />));

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
