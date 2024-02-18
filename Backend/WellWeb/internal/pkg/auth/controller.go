package auth

import (
	"WellWeb/internal/util/requestutil"
	"encoding/json"
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

/* Login Controller & Schema */
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (controller *controller) Login(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Login"))
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
*/

type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`

	EmailAddress string `json:"email_address"`
	PhoneNumber  string `json:"phone_number"`
}

func (controller *controller) Register(w http.ResponseWriter, r *http.Request) {
	// Validate Request Headers, Method, Content Type, etc.
	if requestutil.ValidateRequestMethod("POST", w, r) != 0 {
		return
	}

	if requestutil.ValidateContentType("application/json", w, r) != 0 {
		return
	}

	// Check for Method
	method := r.URL.Query().Get("method")
	var registerRequest RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	switch method {
	case "email":
		controller.service.RegisterWithEmailAddress(
			registerRequest.EmailAddress,
			registerRequest.Username,
			registerRequest.Password,
		)
	case "phone":

	default:
		http.Error(w, "Valid Registration Method Not Provided", http.StatusNotAcceptable)
		return
	}
}
