/* eslint-disable no-undef */
import socketClient from 'socket.io-client';

const { publicRuntimeConfig } = getConfig();
const { ASSET_PREFIX } = publicRuntimeConfig;



class Socket {

  socket;
  eventList = [];

  constructor() {
    if (!Socket.instance) {
      const options = {};

      if (ASSET_PREFIX) {
        options.path = `${ASSET_PREFIX}`;
      }

      this.socket = socketClient(API_CLUSTERING_URL, options);
      this.socket.on('connect', () => {
        // connect socket
      });

      this.socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          this.socket.connect();
        }
        // else the socket will automatically try to reconnect
      });

      this.socket.on('connect_error', () => {
        // error
      });

      this.socket.on('connect_timeout', () => {
        //timeout
      });

      this.socket.on('reconnecting', () => {
        //reconnecting
      });

      ClusteringSocket.instance = this;
    }

    return ClusteringSocket.instance;
  }

  initializeEvents(event, callback) {
    if (!this.eventList.includes(event)) {
      this.eventList.push(event)
      this.socket.on(event, data => {
        callback(data);
      });
    }
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default Socket;