import { WebSocketServer } from "ws";
import User from "./schema/user.js";

const clients = new Set();

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("🟢 WebSocket connected");
    clients.add(ws);

    const users = await User.find().sort({ points: -1 });
    const data = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      points: u.points
    }));
    ws.send(JSON.stringify({ type: "leaderboard_update", data }));

    ws.on("close", () => {
      clients.delete(ws);
      console.log("🔴 WebSocket disconnected");
    });
  });
};

export const broadcastLeaderboard = async () => {
  const users = await User.find().sort({ points: -1 });
  const data = users.map(u => ({
    id: u._id.toString(),
    name: u.name,
    points: u.points
  }));

  const message = JSON.stringify({ type: "leaderboard_update", data });

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(message);
    }
  }
};
