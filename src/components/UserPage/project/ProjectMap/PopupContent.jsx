import React from "react";

const PopupContent = ({ lat, lng, index }) => {
  return (
    <div>
      <p>{`lat: ${lat}, lng: ${lng}`}</p>{" "}
      <button
        onClick={() => {
          handleOnDelete(index);
        }}
      >
        delete
      </button>
      <button>edit</button>
    </div>
  );
};

export default PopupContent;
