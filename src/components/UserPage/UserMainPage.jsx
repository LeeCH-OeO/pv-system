import React from "react";
import { useState, useEffect } from "react";
const UserMainPage = () => {
  const [userName, setUserName] = useState({
    firstName: "321",
    lastName: "123",
  });
  const fetchUserInfo = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    setUserName({ ...userName, firstName: firstName, lastName: lastName });
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <div>
      <h2>
        hello! {userName.firstName} {userName.lastName}
      </h2>
    </div>
  );
};

export default UserMainPage;
