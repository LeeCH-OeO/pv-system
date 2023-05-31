import React from "react";

const ProductItem = ({ name, para1, para2, para3 }) => {
  return (
    <div>
      <h3>
        {name}: parameter1:{para1}, parameter2:{para2}, parameter:{para3}
      </h3>
    </div>
  );
};

export default ProductItem;
