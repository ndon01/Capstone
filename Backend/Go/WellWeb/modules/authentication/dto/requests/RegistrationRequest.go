package requests

type RegistrationRequest struct {
	DisplayName  string `json:"displayName"`
	Username     string `json:"username"`
	EmailAddress string `json:"emailAddress"`
	DateOfBirth  string `json:"dateOfBirth"`
	Password     string `json:"password"`
}
