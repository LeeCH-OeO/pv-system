import React from "react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";

const ProjectMap = ({ height, width, center }) => {
  const [positionList, setPostitionList] = useState([]);
  const ClickMarker = () => {
    const map = useMapEvent("click", (e) => {
      setPostitionList((positionList) => [...positionList, e.latlng]);
    });
    console.log(positionList);
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
      <Marker position={[center.lat, center.lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ClickMarker />
      {positionList.map((pos) => {
        return (
          <Marker position={[pos.lat, pos.lng]}>
            <Popup>
              <p>{`lat: ${pos.lat}, lng: ${pos.lng}`}</p>{" "}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProjectMap;
