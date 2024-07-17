import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities, updateActivity } from "../services/api";
import CallItem from "./CallItem";
import ArchiveButton from "./ArchiveButton";
import Logo from "./Logo";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import DialpadIcon from "@mui/icons-material/Dialpad";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import TuneIcon from "@mui/icons-material/Tune";
import Badge from "@mui/material/Badge";
import "./ActivityFeed.css";

const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const response = await getActivities();
      setCalls(response.data.filter((call) => !call.is_archived));
    } catch (error) {
      console.error('Error fetching calls', error);
    }
  };

  const archiveCall = async (id) => {
    try {
      await updateActivity(id, { is_archived: true });
      fetchCalls();
    } catch (error) {
      console.error('Error archiving call', error);
    }
  };

  const archiveAllCalls = async () => {
    try {
      for (const call of calls) {
        await updateActivity(call.id, { is_archived: true });
      }
      fetchCalls();
    } catch (error) {
      console.error('Error archiving all calls', error);
    }
  };

  const groupCallsByDate = (calls) => {
    return calls.reduce((groups, call) => {
      const date = new Date(call.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(call);
      return groups;
    }, {});
  };

  const renderCallItem = (call) => (
    <CallItem
      key={call.id}
      call={call}
      onArchive={() => archiveCall(call.id)}
      onSelect={() => navigate(`/call/${call.id}`)}
    />
  );

  const groupedCalls = groupCallsByDate(calls);

  const missedCallsCount = calls.reduce(
    (acc, call) => acc + (call.call_type === "Missed" ? 1 : 0),
    0
  );

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <div className="logo-container">
          <Logo />
          <span className="activity-title">Activity</span>
        </div>
       
        <div className="tabs">
          <button className="tab-button">Inbox</button>
          <button className="tab-button">All calls</button>
          <TuneIcon className="tab-button border-filter "/>
        </div>
      </div>
      <div className="calls">
        <ArchiveButton onClick={archiveAllCalls} />
        {Object.keys(groupedCalls).map((date) => (
          <div key={date}>
            <div className="date-divider">
              <span className="date-text">{date}</span>
            </div>
            {groupedCalls[date].map((call) => renderCallItem(call))}
          </div>
        ))}
      </div>
      <div className="bottom-nav">
        <Badge badgeContent={missedCallsCount} color="error">
          <PhoneIcon className="nav-icon" />
          <div className="slider"></div>
        </Badge>
        <PeopleIcon className="nav-icon" />
        <div className="nav-icon-container">
          <DialpadIcon className="nav-icon nav-icon-green" />
        </div>
        <SettingsIcon className="nav-icon" />
        <TripOriginIcon className="nav-icon" />
      </div>
    </div>
  );
};

export default ActivityFeed;