package main

import (
	"log"

	"github.com/nikolaj808/tic-tac-toe/internal/server"
)

func main() {

	hub := server.CreateHub()

	go hub.Run()

	server := server.NewServer(hub)

	log.Println("Starting server on", server.Addr)

	err := server.ListenAndServe()

	if err != nil {
		panic("Unable to start server")
	}
}
