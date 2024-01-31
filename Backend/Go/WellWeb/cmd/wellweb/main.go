package main

import (
	"log"
	"net/http"
)

func main() {
	// print hello world
	log.Println("Booting Up")

	// Services

	// Start the server
	log.Println("Server is ready to handle requests on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
