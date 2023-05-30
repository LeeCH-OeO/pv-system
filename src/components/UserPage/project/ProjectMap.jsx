import React from "react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";

const ProjectMap = ({ height, width, center, markers }) => {
  const [positionList, setPostitionList] = useState(markers);
  const ClickMarker = () => {
    const map = useMapEvent("click", (e) => {
      setPostitionList((positionList) => [...positionList, e.latlng]);
    });
  };
  return (
    <MapContainer
      style={{ width: `${width}`, height: `${height}` }}
      center={[center.lat, center.lng]}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickMarker />
      {positionList.map((pos, index) => {
        return (
          <Marker position={[pos.lat, pos.lng]} key={index}>
            <Popup>
              <p>{`lat: ${pos.lat}, lng: ${pos.lng}`}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProjectMap;
