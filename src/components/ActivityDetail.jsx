import React, { useState, useEffect } from "react";
import { getActivityDetail } from "../services/api";
import "./ActivityFeed.css";

const ActivityDetail = ({ callId }) => {
  const [call, setCall] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(callId);
        setCall(response.data);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };
    fetchActivityDetail();
  }, [callId]);

  if (!call) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activity-detail">
      <h2>Call Details</h2>
      <p>
        <strong>Number:</strong> {call.from}
      </p>
      <p>
        <strong>Type:</strong> {call.call_type}
      </p>
      <p>
        <strong>Time:</strong> {new Date(call.created_at).toLocaleTimeString()}
      </p>
      <p>
        <strong>Date:</strong> {new Date(call.created_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Duration:</strong> {call.duration} seconds
      </p>
    </div>
  );
};

export default ActivityDetail;
