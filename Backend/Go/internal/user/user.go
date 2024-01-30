package user

import (
	"net/http"
)

// Register handles user registration.
func Register(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Register"))
}

// Login handles user login.
func Login(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Login"))
}

// InitRoutes initializes the routes for the user package.
func InitRoutes() {
	http.HandleFunc("/users/register", Register)
	http.HandleFunc("/users/login", Login)
}

// localhost:8080/users/register