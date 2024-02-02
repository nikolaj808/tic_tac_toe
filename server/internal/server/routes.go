package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (s *Server) RegisterRoutes(hub *Hub) http.Handler {

	mux := http.NewServeMux()
	mux.HandleFunc("/", s.handler)
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		s.websocketHandler(hub, w, r)
	})

	return mux
}

func (s *Server) websocketHandler(hub *Hub, w http.ResponseWriter, r *http.Request) {

	connection, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return
	}

	client := CreateClient(hub, connection)
	hub.register <- client

	go func() {
		defer func() {
			hub.unregister <- client
			connection.Close()
		}()

		for {
			_, message, err := connection.ReadMessage()

			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					log.Printf("Read message error: %v", err)
				}
				break
			}

			response := CreateClientResponseFromClientRequest(hub, client, message)

			log.Println(response)

			responseMessage, err := json.Marshal(response)

			if err != nil {
				log.Printf("Response marshal error: %v", err)
			}

			connection.WriteMessage(websocket.TextMessage, responseMessage)
		}
	}()
}

func (s *Server) handler(w http.ResponseWriter, r *http.Request) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("error handling JSON marshal. Err: %v", err)
	}

	_, _ = w.Write(jsonResp)
}
