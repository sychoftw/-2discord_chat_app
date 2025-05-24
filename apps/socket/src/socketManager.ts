 import WebSocket from "ws"
export class User{
  public id :string;
  public username : string;

  public email : string;
  public socket :WebSocket

  constructor(socket: WebSocket,userDetails: {id: string, username: string, email: string}){
    this.socket = socket;
    this.id = userDetails.id;
    this.username = userDetails.username;
    this.email = userDetails.email;
  }
}

class SocketManager{

     private static instance: SocketManager;

    private users: Map<string, WebSocket>;


    constructor(){
        this.users = new Map<string,WebSocket>();
    }

    static getInstance() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = new SocketManager();
    return SocketManager.instance;
    }

    addUser(socket: WebSocket, userDetails: {id: string, username: string, email: string}): void {
    const user = new User(socket, userDetails);
    this.users.set(user.id, socket);
    }
    removeUser(userId: string): void {
        this.users.delete(userId);
    }

}
export const socketManager = SocketManager.getInstance()