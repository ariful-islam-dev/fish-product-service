import http from "http";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "Fish Service";
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`${serviceName} Server is running on http://localhost:${PORT}`);
});
