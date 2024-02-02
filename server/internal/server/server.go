package server

import (
	"fmt"
	"net/http"
	"time"
)

const port = 8080

type Server struct {
	port int
}

func NewServer(hub *Hub) *http.Server {

	NewServer := &Server{
		port: port,
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(hub),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
