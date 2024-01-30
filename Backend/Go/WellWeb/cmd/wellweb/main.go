package main

import (
	"WellWeb/modules/authentication"
	"log"
	"net/http"
)

func InitRoutes() {
	log.Println("Initializing routes")

	// authentication routes
	authentication.InitRoutes()

	// exercises routes

	http.HandleFunc("/exercises", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Getting exercises")
		w.Write([]byte("Getting exercises"))
	})

	// food routes

	http.HandleFunc("/food", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Getting food")
		w.Write([]byte("Getting food"))
	})

	// diary routes (tracks food, exercise, sleep, etc)

	http.HandleFunc("/diary", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Getting diary")
		w.Write([]byte("Getting diary"))
	})

}

func main() {
	// print hello world
	log.Println("Booting Up")

	// Initialize the routes
	InitRoutes()

	// Start the server
	log.Println("Server is ready to handle requests on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
