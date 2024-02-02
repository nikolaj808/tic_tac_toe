package server

import (
	"log"

	"github.com/nikolaj808/tic-tac-toe/internal/utils"
)

type Hub struct {
	register   chan *Client
	unregister chan *Client
	createRoom chan *CreateRoom
	joinRoom   chan *JoinRoom
	clients    []*Client
	rooms      []*Room
}

func (hub *Hub) Run() {

	for {
		select {
		case client := <-hub.register:
			hub.clients = append(hub.clients, client)
			log.Println("Client registered")

		case unregisterClient := <-hub.unregister:
			updatedClients, _ := utils.RemoveBy(hub.clients, func(client *Client) bool {
				return client.id == unregisterClient.id
			})

			hub.clients = updatedClients
			close(unregisterClient.send)
			log.Println("Client unregistered")

		case createRoom := <-hub.createRoom:
			newRoom := &Room{
				name:  createRoom.name,
				host:  createRoom.client,
				users: []*Client{createRoom.client},
			}
			hub.rooms = append(hub.rooms, newRoom)
			log.Printf("Room created with name: %v", createRoom.name)

		case joinRoom := <-hub.joinRoom:
			if roomIndex, ok := utils.IndexOf[*Room](hub.rooms, func(room *Room) bool {
				return room.name == joinRoom.name
			}); ok {
				log.Println(roomIndex)

				hub.rooms[roomIndex].users = append(hub.rooms[roomIndex].users, joinRoom.client)

				log.Printf("Client joined room with name: %v", joinRoom.name)
			}
		}
	}
}

func CreateHub() *Hub {

	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		createRoom: make(chan *CreateRoom),
		joinRoom:   make(chan *JoinRoom),
		clients:    make([]*Client, 0),
		rooms:      make([]*Room, 0),
	}
}
