import React, { useState, useEffect } from "react";
import { getActivities, updateActivity } from "../services/api";
import CallItem from "./CallItem";
import UnarchiveButton from "./UnarchiveButton";
import "./ArchivedCalls.css";

const generateDummyData = () => [
  {
    id: 1,
    from: '+33 6 45 13 53 91',
    to: 'Xavier',
    call_type: 'Missed',
    created_at: '2023-07-27T07:58:00Z',
    is_archived: true,
    missedCount: 2,
  },
  {
    id: 2,
    from: '+33 6 45 13 53 91',
    to: 'Xavier',
    call_type: 'Missed',
    created_at: '2023-07-21T12:34:00Z',
    is_archived: true,
    missedCount: 1,
  },
  {
    id: 3,
    from: 'Arthur Andre',
    to: 'PrivateSportShop',
    call_type: 'Missed',
    created_at: '2023-07-05T19:03:00Z',
    is_archived: true,
    missedCount: 8,
  },
  {
    id: 4,
    from: '+33 1 76 44 04 77',
    to: 'Xavier',
    call_type: 'Missed',
    created_at: '2023-06-23T17:57:00Z',
    is_archived: true,
    missedCount: 1,
  },
];

const ArchivedCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    // For now, we will use dummy data
    const dummyData = generateDummyData();
    setCalls(dummyData.filter((call) => call.is_archived));

    // Uncomment the lines below to fetch from the API
    // try {
    //   const response = await getActivities();
    //   setCalls(response.data.filter((call) => call.is_archived));
    // } catch (error) {
    //   console.error("Error fetching calls:", error);
    // }
  };

  const unarchiveCall = async (id) => {
    try {
      const updatedCalls = calls.map((call) =>
        call.id === id ? { ...call, is_archived: false } : call
      );
      setCalls(updatedCalls.filter((call) => call.is_archived));
    } catch (error) {
      console.error("Error unarchiving call:", error);
    }
  };

  const unarchiveAllCalls = async () => {
    try {
      const updatedCalls = calls.map((call) => ({ ...call, is_archived: false }));
      setCalls(updatedCalls.filter((call) => call.is_archived));
    } catch (error) {
      console.error("Error unarchiving all calls:", error);
    }
  };

  return (
    <div className="archived-calls">
      <div className="archived-calls-header">
        <p>Archived Calls</p>
        <UnarchiveButton onClick={unarchiveAllCalls} />
      </div>
      <div className="calls">
        {calls.map((call) => (
          <CallItem key={call.id} call={call} onArchive={() => unarchiveCall(call.id)} />
        ))}
      </div>
    </div>
  );
};

export default ArchivedCalls;