export const LIST_ROOMS_EVENT = "LIST_ROOMS";
export const CREATE_ROOM_EVENT = "CREATE_ROOM";
export const JOIN_ROOM_EVENT = "JOIN_ROOM";

export type WebSocketRequest = {
  request: string;
  payload: Record<string, any>;
};

export function getListRoomsEvent() {
  return {
    request: LIST_ROOMS_EVENT,
  };
}

export function getCreateRoomEvent(name: string) {
  return {
    request: CREATE_ROOM_EVENT,
    payload: {
      name,
    },
  };
}

export function getJoinRoomEvent(name: string) {
  return {
    request: JOIN_ROOM_EVENT,
    payload: {
      name,
    },
  };
}
