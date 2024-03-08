package auth

type User struct {
	Username string `json:"username"`
	ID       int    `json:"id"`
}

type UserAuthentication struct {
	ID       int    `json:"id"`
	UserID   int    `json:"user_id"`
	Password string `json:"password"`
}
