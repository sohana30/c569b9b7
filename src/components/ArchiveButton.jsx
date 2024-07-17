import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import "./ArchiveButton.css";

const ArchiveButton = ({ onClick }) => (
  <button className="archive-button" onClick={onClick}>
    <ArchiveIcon style={{ marginRight: "8px" }} />
    Archive all calls
  </button>
);

export default ArchiveButton;
