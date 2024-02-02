package server

import (
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Client struct {
	id         uuid.UUID
	hub        *Hub
	connection *websocket.Conn
	send       chan []byte
}

type ClientDTO struct {
	id uuid.UUID
}

func CreateClient(hub *Hub, connection *websocket.Conn) *Client {
	id := uuid.New()

	return &Client{
		id:         id,
		hub:        hub,
		connection: connection,
		send:       make(chan []byte),
	}
}

func GetClientDTOFromClient(client *Client) ClientDTO {
	return ClientDTO{
		id: client.id,
	}
}

func GetClientDTOsFromClients(clients []*Client) []ClientDTO {
	clientDTOs := make([]ClientDTO, 0)

	for _, client := range clients {
		clientDTOs = append(clientDTOs, GetClientDTOFromClient(client))
	}

	return clientDTOs
}
