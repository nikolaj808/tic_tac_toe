package server

import (
	"encoding/json"
	"log"
)

type ClientRequest struct {
	Request string `json:"request"`
	Payload any    `json:"payload"`
}

type ClientResponse struct {
	Response string `json:"response"`
	Data     any    `json:"data"`
}

func CreateClientResponseFromClientRequest(hub *Hub, client *Client, message []byte) ClientResponse {

	var clientRequest ClientRequest

	json.Unmarshal(message, &clientRequest)

	request := clientRequest.Request
	payload := clientRequest.Payload

	log.Println(clientRequest)
	log.Println(request)
	log.Println(payload)

	switch request {

	case "LIST_ROOMS":

		clientResponse := ClientResponse{
			Response: request,
			Data:     GetRoomDTOsFromRooms(hub.rooms),
		}
		return clientResponse

	case "CREATE_ROOM":
		// data := make(map[string]int)
		// clientResponse := ClientResponse{
		// 	Response: request,
		// 	Data:
		// }
		return ClientResponse{}

	case "JOIN_ROOM":
		return ClientResponse{}

	default:
		return ClientResponse{}
	}
}
