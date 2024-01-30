package authentication

import (
	"encoding/json"
	"log"
	"net/http"
)

// InitRoutes initializes the authentication routes
func InitRoutes() {
	log.Println("Initializing authentication routes")

	http.HandleFunc("/authentication/login", loginHandler)
	http.HandleFunc("/authentication/register", registerHandler)
	http.HandleFunc("/authentication/logout", logoutHandler)
	http.HandleFunc("/authentication/refreshtoken", refreshTokenHandler)

	// Add more routes here as needed
}

type RegistrationRequest struct {
	DisplayName  string `json:"displayName"`
	Username     string `json:"username"`
	EmailAddress string `json:"emailAddress"`
	DateOfBirth  string `json:"dateOfBirth"`
	Password     string `json:"password"`
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request"))
		return
	}

	// Create a LoginRequest instance with passed data from the client
	var registrationRequest RegistrationRequest

	// Decode the request body into the LoginRequest instance
	err := json.NewDecoder(r.Body).Decode(&registrationRequest)

	// Check if there was an error decoding the request body
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request"))
		return
	}

	// print the registration request
	log.Println(registrationRequest)

	w.Write([]byte("Registration Successful!"))
}

type LoginRequest struct {
	Identifier string `json:"identifier"`
	Password   string `json:"password"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request"))
		return
	}

	// Create a LoginRequest instance with passed data from the client
	var loginRequest LoginRequest

	// Decode the request body into the LoginRequest instance
	err := json.NewDecoder(r.Body).Decode(&loginRequest)

	// Check if there was an error decoding the request body
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request"))
		return
	}

	// Check if the identifier and password are not empty
	if loginRequest.Identifier == "" || loginRequest.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request"))
		return
	}

	// print the login request
	log.Println(loginRequest)

	w.Write([]byte("Login Successful!"))
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Logout handler"))
}

func refreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Refresh token handler"))
}
