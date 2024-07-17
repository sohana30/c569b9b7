import React from "react";
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import CallIcon from "@mui/icons-material/PhoneCallback";
import "./CallItem.css";

const CallItem = ({ call, onArchive, onSelect }) => {
  const timeString = new Date(call.created_at)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
  const [time, period] = timeString.split(" ");

  return (
    <div className="call-item" onClick={onSelect}>
      <div className="call-details">
        <CallIcon className="call-icon" />
        <div className="call-info">
          <span className="call-number">
            {call.from}
            {call.missedCount > 1 && (
              <span className="missed-count">{call.missedCount}</span>
            )}
          </span>
          <span className="call-description">tried to call on {call.to}</span>
        </div>
      </div>
      <div className="call-time">
        {time}
        <span className="call-period">{period}</span>
      </div>
    </div>
  );
};

export default CallItem;
