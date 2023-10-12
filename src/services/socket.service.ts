import { io, Socket } from 'socket.io-client';

import { getLocalConfig } from '~/services/config.service';

const { API_EP } = getLocalConfig();

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(API_EP, { path: '/chat' });
  }
}

export const socketService = new SocketService();
