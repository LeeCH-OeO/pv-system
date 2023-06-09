import React from "react";
import { useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";

const ProjectMap = ({ height, width, center, markers }) => {
  const [positionList, setPostitionList] = useState(markers);
  positionList.map((item, index) => {
    item.id = index;
  });
  const handleOnDelete = (index) => {
    const updatedList = [...positionList];
    updatedList.splice(index, 1);
    setPostitionList(updatedList);
  };
  const ClickMarker = () => {
    const map = useMapEvent("dblclick", (e) => {
      setPostitionList((positionList) => [...positionList, e.latlng]);
      positionList.map((item, index) => {
        item.id = index;
      });
    });
  };

  return (
    <MapContainer
      on
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
            <Popup eventHandlers={{}}>
              <div>
                <p>{`lat: ${pos.lat}, lng: ${pos.lng}, id:${index}`}</p>{" "}
                <button
                  onClick={() => {
                    handleOnDelete(index);
                  }}
                >
                  delete
                </button>
                <button>edit</button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProjectMap;
