import React from "react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";

const Project = () => {
  const [positionList, setPostitionList] = useState([]);
  const ClickMarker = () => {
    const map = useMapEvent("click", (e) => {
      setPostitionList((positionList) => [...positionList, e.latlng]);
    });
    console.log(positionList);
  };
  return (
    <MapContainer
      style={{ height: "80vh", width: "80vw" }}
      center={[50.8284470415822, 12.920068886090974]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[50.8284470415822, 12.920068886090974]}>
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

export default Project;
