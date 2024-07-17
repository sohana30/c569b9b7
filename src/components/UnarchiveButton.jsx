import React from "react";
import Button from "@mui/material/Button";

const UnarchiveButton = ({ onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    Unarchive All
  </Button>
);

export default UnarchiveButton;