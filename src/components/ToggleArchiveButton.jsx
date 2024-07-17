import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import "./ArchiveButton.css";

const ToggleArchiveButton = ({ onClick, allArchived }) => (
  <button className="archive-button" onClick={onClick}>
    {allArchived ? (
      <>
        <UnarchiveIcon style={{ marginRight: "8px" }} />
        Unarchive all calls
      </>
    ) : (
      <>
        <ArchiveIcon style={{ marginRight: "8px" }} />
        Archive all calls
      </>
    )}
  </button>
);

export default ToggleArchiveButton;
