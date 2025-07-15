import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "./AddUserForm";
import UserSelector from "./UserSelector";
import Leaderboard from "./Leaderboard";
import ClaimHistory from "./ClaimHistory";

const generatePoints = () => Math.floor(Math.random() * 100) + 1;

const UserClaimApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userHistories, setUserHistories] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data.users.map(u => ({
        id: u._id,
        name: u.name,
        points: u.points || 0,
      })));
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get("http://localhost:3000/api/history");
      const history = res.data.history.map(h => ({
        id: h._id,
        userId: h.user,
        points: h.points,
        timestamp: h.createdAt || new Date().toISOString(),
      }));
      setUserHistories(history.reverse());
    } catch (err) {
      console.error("❌ Failed to fetch history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleClaimPoints = async () => {
    const points = generatePoints();
    try {
      await axios.post("http://localhost:3000/api/claim", {
        userId: selectedUserId,
        points,
      });
    } catch (err) {
      console.error("❌ Claim error", err);
    }
  };

  const handleViewHistory = async () => {
    if (!showHistory) {
      await fetchHistory();
    }
    setShowHistory(true);
  };
useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => console.log("✅ WebSocket connected");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "leaderboard_update") {
      setUsers(data.data.map(u => ({
        id: u.id,
        name: u.name,
        points: u.points,
      })));
    }
  };

  ws.onerror = (err) => console.error("❌ WebSocket error", err);
  ws.onclose = () => console.log("🔌 WebSocket closed");

  return () => ws.close();
}, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Add New User</h2>
            <AddUserForm onUserAdded={fetchUsers} />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Claim Points</h2>
            <UserSelector
              users={users}
              selectedUserId={selectedUserId}
              onChange={setSelectedUserId}
              onClaim={handleClaimPoints}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <Leaderboard users={users} onViewHistory={handleViewHistory} />
        </div>

        {showHistory && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <ClaimHistory
              users={users}
              histories={userHistories}
              loading={loadingHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserClaimApp;
