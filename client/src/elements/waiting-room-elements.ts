export function getWaitingRoomElement() {
  return document.getElementById("waiting-room")!;
}

export function createWaitingRoomListElement() {
  const waitingRoomListElement = document.createElement("ul");
  waitingRoomListElement.classList.add(
    "flex",
    "flex-col",
    "px-6",
    "py-4",
    "gap-2"
  );

  return waitingRoomListElement;
}

export function createWaitingRoomListItemElement(title: string) {
  const waitingRoomListItemElement = document.createElement("li");
  waitingRoomListItemElement.classList.add("text-lg", "font-medium");
  waitingRoomListItemElement.innerText = title;

  return waitingRoomListItemElement;
}

export function createEmptyListElement() {
  const waitingRoomEmptyElement = document.createElement("div");
  waitingRoomEmptyElement.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "w-full",
    "h-full"
  );

  const waitingRoomEmptyTextElement = document.createElement("p");

  waitingRoomEmptyTextElement.innerText =
    "No active rooms could be found...\nCreate one for yourself!";
  waitingRoomEmptyTextElement.classList.add(
    "text-xl",
    "font-medium",
    "text-center"
  );

  waitingRoomEmptyElement.appendChild(waitingRoomEmptyTextElement);

  return waitingRoomEmptyElement;
}
