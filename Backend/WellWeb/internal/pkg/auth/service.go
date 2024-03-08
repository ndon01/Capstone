package auth

import (
	"WellWeb/internal/util/passwordutil"
	"WellWeb/internal/util/tokenutil"
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type service struct {
	repository *repository
}

func newService(repository *repository) *service {
	var service = new(service)

	service.repository = repository

	return service
}

/*
	Registration
*/

func (service *service) registerUser(username string, password string) (*string, error) {
	// Validate Username is Unique
	var exists bool
	if exists, _ = service.repository.DoesUsernameExist(username); exists {
		fmt.Printf("Username Exists: %s\n", username)
		return nil, errors.New("Username Already Exists")
	}
	fmt.Printf("Username Available: %s\n", username)

	// Validate Password

	// Hash Password
	hashedPass, err := passwordutil.HashPassword(password)
	if err != nil {
		fmt.Printf("Error Hashing Password: %s\n", err)
		return nil, errors.New("error with password, try another password")
	}
	fmt.Print("Password Hashed\n")

	// Register User
	user, err := service.repository.CreateUser(username, hashedPass)
	if err != nil {
		fmt.Printf("Error Creating User in DB: %s\n", err)
		return nil, err
	}

	// Generate Refresh Token

	claims := &jwt.RegisteredClaims{
		Subject:   strconv.Itoa(user.ID),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		Issuer:    "Auth",
		Audience:  jwt.ClaimStrings{"All"},
	}

	// Generate Token

	token, err := tokenutil.GenerateTokenWithClaims(claims)
	if err != nil {
		fmt.Println("Error Generating Token: ", err)
		return nil, err
	}

	fmt.Printf("Token Generated: %s\n", token)

	fmt.Printf("User Created: %s (%d)", user.Username, user.ID)
	return &token, nil
}

// Login

func (service *service) loginUserWithUsernameAndPassword(username string, password string) (string, error) {
	// Get User Auth
	user, err := service.repository.GetUserByUsername(username)
	if err != nil {
		return "", err
	}

	fmt.Printf("User Found: %s (%d)\n", user.Username, user.ID)

	userAuth, err := service.repository.GetUserAuthByUserID(user.ID)

	if err != nil {
		fmt.Println("Error Getting User Auth: ", err)
		return "", err
	}

	fmt.Printf("User Auth Found: %d\n", userAuth.ID)

	// Check Password
	if !passwordutil.CheckPasswordHash(password, userAuth.Password) {
		fmt.Println("Invalid Password")
		return "", errors.New("invalid password or username")
	}

	fmt.Printf("User Authenticated: %s (%d)\n", username, user.ID)

	claims := &jwt.RegisteredClaims{
		Subject:   strconv.Itoa(user.ID),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		Issuer:    "Auth",
		Audience:  jwt.ClaimStrings{"Auth"},
	}

	// Generate Token
	token, err := tokenutil.GenerateTokenWithClaims(claims)
	if err != nil {
		fmt.Println("Error Generating Token: ", err)
		return "", err
	}

	fmt.Printf("Token Generated: %s\n", token)

	return token, nil
}

// Sessions

func (service *service) startSession(token *string) (*string, error) {
	// Get Token
	var decodedToken *jwt.Token
	var err error

	decodedToken, err = tokenutil.DecodeToken(*token)
	if err != nil {
		fmt.Println("Error Decoding Token: ", err)
		return nil, err
	}

	if !decodedToken.Valid {
		fmt.Println("Invalid Token")
		return nil, errors.New("invalid token")
	}

	// Get User ID
	var userId string
	userId, err = decodedToken.Claims.GetSubject()
	if err != nil {
		fmt.Println("Error Getting User ID: ", err)
		return nil, err
	}

	fmt.Printf("User ID: %s\n", userId)

	// Create the Claims
	claims := &jwt.RegisteredClaims{
		Subject:   userId,
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 1)),
		Issuer:    "Auth",
		Audience:  jwt.ClaimStrings{"All"},
	}

	var hotToken string
	hotToken, err = tokenutil.GenerateTokenWithClaims(claims)

	if err != nil {
		fmt.Println("Error Generating Token")
		return nil, errors.New("error generating token")
	}

	return &hotToken, nil
}
