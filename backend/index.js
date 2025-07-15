import express from "express";
import apiRoutes from "./routes/api.js";
import cors from "cors";
import connectDB from "./db/config.js";
import http from "http";
import { setupWebSocket } from "./websocket.js";

const app = express();
const server = http.createServer(app); 

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", apiRoutes);

setupWebSocket(server); 

server.listen(3000, () => {
  console.log("✅ Server + WebSocket listening on port 3000");
});
