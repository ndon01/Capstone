package requests

type AuthenticationData struct {
	Username     *string `json:"username"`
	EmailAddress *string `json:"emailAddress"`s
	PhoneNumber  *string `json:"phoneNumber"`
	Password     *string `json:"password"`
	Code         *string `json:"code"`
}

// AuthType can be "password", "email", "phone", or "code"

type AuthenticationRequest struct {
	AuthType string              `json:"authType"`
	AuthData *AuthenticationData `json:"authData"`
}
