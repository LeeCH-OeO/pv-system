import { TextField } from "@mui/material";
import React from "react";
import { EditCardContainer } from "./style";

const EditCard = ({ name, email }) => {
  return (
    <div>
      <EditCardContainer>
        <TextField
          fullWidth
          label="Name"
          defaultValue={name}
          variant="filled"
        />
        <TextField
          fullWidth
          label="Email"
          defaultValue={email}
          variant="filled"
        />
        <TextField fullWidth label="old password" variant="filled" />
        <TextField fullWidth label="new password" variant="filled" />
      </EditCardContainer>
    </div>
  );
};

export default EditCard;
