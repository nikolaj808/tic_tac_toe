import { Room } from "./room";
import {
  createEmptyListElement,
  createWaitingRoomListElement,
  createWaitingRoomListItemElement,
  getWaitingRoomElement,
} from "./elements/waiting-room-elements";
import { CREATE_ROOM_EVENT, LIST_ROOMS_EVENT } from "./web-socket-requests";

export type WebSocketResponse = {
  timeStamp: number;
  response: string;
  data: unknown;
};

export function parseMessage(messageEvent: MessageEvent): WebSocketResponse {
  const json = JSON.parse(messageEvent.data);

  return {
    timeStamp: messageEvent.timeStamp,
    response: json.response as string,
    data: json.data as unknown,
  };
}

export function handleMessage(message: WebSocketResponse) {
  const response = message.response;
  const data = message.data;

  console.log(response);
  console.log(data);

  switch (response) {
    case LIST_ROOMS_EVENT:
      const rooms = data as Room[];

      const waitingRoomElement = getWaitingRoomElement();

      if (rooms.length <= 0) {
        const waitingRoomEmptyElement = createEmptyListElement();

        waitingRoomElement.innerHTML = waitingRoomEmptyElement.outerHTML;
        break;
      }

      const waitingRoomListElement = createWaitingRoomListElement();

      for (const room of rooms) {
        const waitingRoomListItemElement = createWaitingRoomListItemElement(
          room.name
        );

        waitingRoomListElement.appendChild(waitingRoomListItemElement);
      }

      waitingRoomElement.innerHTML = waitingRoomListElement.outerHTML;
      break;

    case CREATE_ROOM_EVENT:
      break;

    default:
      break;
  }
}
