import axios from "axios";

const PROJECT_ID = "SK.0.nkqY9CFwLG4NK5bPu1lBJ60mVTVSIO";
const PROJECT_SECRET = "T2ZqUjF5TlFwMHdNbnRZNnk0SjZIeTRWdVFiTDlVeUU=";
const BASE_URL = "https://api.stringee.com/v1/room2";

  export const  createRoom= async(userToken)=> {
    const roomName = Math.random().toFixed(4);
    const response = await axios.post(
      `${BASE_URL}/create`,
      {
        name: roomName,
        uniqueName: roomName
      },
      {
        headers: {
          "X-STRINGEE-AUTH": userToken
        }
      }
    );

    const room = response.data;
    console.log({ room });
    return room;
  }

  // async listRoom() {
  //   const response = await axios.get(`${BASE_URL}/list`, {
  //     headers: this._authHeader()
  //   });

  //   const rooms = response.data.list;
  //   console.log({ rooms });
  //   return rooms;
  // }
  
  // async deleteRoom(roomId) {
  //   const response = await axios.put(`${BASE_URL}/delete`, {
  //     roomId
  //   }, {
  //     headers: this._authHeader()
  //   })
    
  //   console.log({response})
    
  //   return response.data;
  // }
  
  // async clearAllRooms() {
  //   const rooms = await this.listRoom()
  //   const response = await Promise.all(rooms.map(room => this.deleteRoom(room.roomId)))
    
  //   return response;
  // }

  const  setRestToken= async()=> {
    const tokens = await _getToken({ rest: true });
    return tokens.rest_access_token;

  }

export const getUserToken= async(userId) =>{
    const tokens = await _getToken({ userId });
    return tokens.access_token;
  }

export const  getRoomToken= async(roomId) =>{
    const tokens = await _getToken({ roomId });
    return tokens.room_token;
  }

const _getToken= async({ userId, roomId, rest }) => {
    const response = await axios.get(
      "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
      {
        params: {
          keySid: PROJECT_ID,
          keySecret: PROJECT_SECRET,
          userId,
          roomId,
          rest
        }
      }
    );

    const tokens = response.data;
    console.log({ tokens });
    return tokens;
  }

  const _authHeader=()=> {
    return {
      "X-STRINGEE-AUTH": this.restToken
    };
  }

export const stringeeApi = {
  createRoom,
  getUserToken,
  setRestToken,
  getRoomToken
};