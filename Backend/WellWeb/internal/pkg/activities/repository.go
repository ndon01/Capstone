package auth

import (
	"fmt"

	"github.com/go-pg/pg/v10"
)

type repository struct {
	db *pg.DB
}

func newRepository() *repository {
	var repository = new(repository)

	db := pg.Connect(&pg.Options{
		Addr:     "localhost:5000",
		User:     "postgres",
		Password: "postgres",
		Database: "auth",
	})

	repository.db = db

	return repository
}

func (r *repository) Close() {
	r.db.Close()
}

func (r *repository) CreateUser(username string, password string) (*User, error) {
	// Start a new transaction
	tx, err := r.db.Begin()
	if err != nil {
		fmt.Println("Error Starting Transaction: ", err)
		return nil, err
	}

	// Rollback the transaction in case of failure
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	// Insert the user
	var userId int
	_, err = tx.Query(pg.Scan(&userId), "INSERT INTO users (username) VALUES (?) RETURNING id", username)
	if err != nil {
		fmt.Println("Error Creating DB User: ", err)
		return nil, err
	}

	// Insert the user authentication
	var userAuthId int
	_, err = tx.Query(pg.Scan(&userAuthId), "INSERT INTO user_auth_data (user_id, password) VALUES (?, ?) RETURNING id", userId, password)
	if err != nil {
		fmt.Println("Error Creating DB User Auth: ", err)
		return nil, err
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		fmt.Println("Error Committing Transaction: ", err)
		return nil, err
	}

	fmt.Println("User ID Created: ", userId)
	fmt.Println("User Auth ID Created: ", userAuthId)

	// create user
	user := &User{
		ID:       userId,
		Username: username,
	}

	return user, nil

}

func (r *repository) GetUserByUsername(username string) (*User, error) {
	var user User

	_, err := r.db.Query(&user, "SELECT id, username FROM users WHERE lower(username) = lower(?)", username)
	if err != nil {
		fmt.Println("Error Getting User: ", err)
		return nil, err
	}

	return &user, nil
}

func (r *repository) GetUserAuthByUsername(username string) (*UserAuthentication, error) {
	var user User
	_, err := r.db.Query(&user, "SELECT 1 FROM users WHERE username = ?", username)
	if err != nil {
		fmt.Println("Error Getting User: ", err)
		return nil, err
	}

	userId := user.ID

	var userAuth UserAuthentication
	_, err = r.db.Query(&userAuth, "SELECT 1 FROM user_auth_data WHERE user_id = ?", userId)
	if err != nil {
		fmt.Println("Error Getting User Auth: ", err)
		return nil, err
	}

	return &userAuth, nil
}

func (r *repository) GetUserAuthByUserID(userId int) (*UserAuthentication, error) {
	var userAuth UserAuthentication
	_, err := r.db.Query(&userAuth, "SELECT id, user_id, password FROM user_auth_data WHERE user_id = ?", userId)
	if err != nil {
		return nil, err
	}

	return &userAuth, nil
}

func (r *repository) DoesUsernameExist(username string) (bool, error) {
	var exists bool

	_, err := r.db.Query(&exists, "SELECT EXISTS(SELECT 1 FROM users WHERE username = ?)", username)
	if err != nil {
		return false, err
	}

	return exists, nil
}
