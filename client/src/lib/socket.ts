import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

let socket: Socket | null = null;

export const connectSocket = (userId: string): Socket => {
  if (!userId) throw new Error("Missing userId");
  if (!socket || !socket.connected) {
    socket = io(BASE_URL, {
      query: { userId },
    });
  }
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
  socket = null;
};
