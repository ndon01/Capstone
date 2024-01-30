package requests

type LoginRequest struct {
	LoginType  string `json:"loginType"`
	Identifier string `json:"identifier"`
	Password   string `json:"password"`
}
