package tokenutil

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateTokenWithClaims(claims *jwt.RegisteredClaims) (string, error) {
	// Generate JWT

	jwtKey := os.Getenv("JWT_KEY")
	fmt.Println("JWT Key: ", jwtKey)

	mySigningKey := []byte(jwtKey)

	// Create the Claims

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, *claims)
	ss, err := token.SignedString(mySigningKey)
	if err != nil {
		fmt.Println("Error Signing Token: ", err)
		return "", err
	}

	return ss, nil

}

func DecodeToken(tokenString string) (*jwt.Token, error) {
	// Decode JWT

	jwtKey := os.Getenv("JWT_KEY")
	fmt.Println("JWT Key: ", jwtKey)

	mySigningKey := []byte(jwtKey)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	})

	if err != nil {
		fmt.Println("Error Decoding Token: ", err)
		return nil, err
	}

	return token, nil
}

func isTokenExpired(token *jwt.Token) bool {
	// Check if the token is expired
	expirationTime, err := token.Claims.(jwt.MapClaims).GetExpirationTime()
	if err != nil {
		fmt.Println("Error getting expiration time: ", err)
		return true // Assume token is expired if there's an error
	}
	return expirationTime.Before(time.Now())
}

func isValidPerspective(token *jwt.Token, perspective string) bool {
	// Check if the token is valid for the perspective
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		fmt.Println("Error getting claims")
		return false
	}

	aud, ok := claims["aud"].(string)
	if !ok {
		fmt.Println("Error getting audience")
		return false
	}

	// if aud is all
	if aud == "All" {
		return true
	}

	if aud == perspective {
		return true
	}

	return false
}

func GetToken(tokenString string) (*jwt.Token, error) {
	// Decode JWT

	jwtKey := os.Getenv("JWT_KEY")
	fmt.Println("JWT Key: ", jwtKey)

	mySigningKey := []byte(jwtKey)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	})

	if err != nil {
		fmt.Println("Error Decoding Token: ", err)
		return nil, err
	}

	// check
	if isTokenExpired(token) {
		return nil, errors.New("invalid token")
	}

	return token, nil
}
