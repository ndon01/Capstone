package main

import (
	"log"
	"myKitchen/internal/user"
	"net/http"
)

func InitDatabase() {
	log.Println("Initializing the database")
}

func InitRoutes() {
	log.Println("Initializing the routes")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Hello World"))
	})

	user.InitRoutes()

}

func main() {
	// print hello world
	log.Println("Booting Up")

	// Initialize the database
	InitDatabase()

	// Initialize the routes
	InitRoutes()

	// Start the server
	log.Println("Server is ready to handle requests on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
