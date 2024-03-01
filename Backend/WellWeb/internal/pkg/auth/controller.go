package auth

import (
	"WellWeb/internal/util/requestutil"
	"encoding/json"
	"fmt"
	"net/http"
)

type controller struct {
	service *service
}

func newController(service *service) *controller {
	var controller = new(controller)

	controller.service = service

	return controller
}

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// Access Token Controller & Schema
/*
	Access Tokens are going to be short lived,
	and will be used to authenticate the
	user for a short period of time.
*/

/* Login Controller & Schema */
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (controller *controller) Login(w http.ResponseWriter, r *http.Request) {
	if requestutil.ValidateRequestMethod("POST", w, r) != 0 {
		return
	}

	if requestutil.ValidateContentType("application/json", w, r) != 0 {
		return
	}

	var loginRequest LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(loginRequest.Username) == 0 || len(loginRequest.Password) == 0 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	fmt.Println("Login Request: ", loginRequest)

	token, err := (*controller.service).loginUserWithUsernameAndPassword(loginRequest.Username, loginRequest.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Authorization", "Bearer "+token)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})

}

/* Register Controller & Schema */

/*
	Route: /auth/register/:method
	Method: POST
	Content-Type: application/json

	Request Query Params:
		- method: email | phone

	Request Body:
		{
			"username": "username",
			"password": "password",
			"email_address": "email_address", (optional if method is phone)
			"phone_number": "phone_number" (optional if method is email)
		}

	Response:
		{
			"token": "token"
		}
*/

type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func (controller *controller) Register(w http.ResponseWriter, r *http.Request) {
	// Validate Request Headers, Method, Content Type, etc.
	if requestutil.ValidateRequestMethod("POST", w, r) != 0 {
		return
	}

	if requestutil.ValidateContentType("application/json", w, r) != 0 {
		return
	}

	var registerRequest RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(registerRequest.Username) == 0 || len(registerRequest.Password) == 0 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	fmt.Println("Register Request: ", registerRequest)

	token, err := (*controller.service).registerUser(registerRequest.Username, registerRequest.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Authorization", "Bearer "+*token)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"token": *token})
}
