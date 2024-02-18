package models

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

type UserAuthentication struct {
	ID           int    `json:"id"`
	UserID       int    `json:"user_id"`
	PasswordHash string `json:"password_hash"`
	// Additional fields as defined in the SQL schema
}

type Permission struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	// Additional fields as defined in the SQL schema
}

type Role struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	// Additional fields as defined in the SQL schema
}

type UserRole struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
	RoleID int `json:"role_id"`
	// Additional fields as defined in the SQL schema
}

type UserPermission struct {
	ID           int  `json:"id"`
	UserID       int  `json:"user_id"`
	PermissionID int  `json:"permission_id"`
	Granted      bool `json:"granted"`
	// Additional fields as defined in the SQL schema
}
