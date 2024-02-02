package server

type Room struct {
	name  string
	host  *Client
	users []*Client
}

type RoomDTO struct {
	name  string
	host  ClientDTO
	users []ClientDTO
}

type CreateRoom struct {
	name   string
	client *Client
}

type JoinRoom struct {
	name   string
	client *Client
}

func GetRoomDTOFromRoom(room *Room) RoomDTO {
	return RoomDTO{
		name:  room.name,
		host:  GetClientDTOFromClient(room.host),
		users: GetClientDTOsFromClients(room.users),
	}
}

func GetRoomDTOsFromRooms(rooms []*Room) []RoomDTO {
	roomDTOs := make([]RoomDTO, 0)

	for _, room := range rooms {
		roomDTOs = append(roomDTOs, GetRoomDTOFromRoom(room))
	}

	return roomDTOs
}
