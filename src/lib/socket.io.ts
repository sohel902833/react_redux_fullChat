import io from "socket.io-client";
const socket = io(process.env.REACT_APP_API_URL as string, {
  reconnectionDelay: 1000,
  reconnection: true,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  reconnectionAttempts: 3,
});

export default socket;
