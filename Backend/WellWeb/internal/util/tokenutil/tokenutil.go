package tokenutil

import (
	"fmt"
	"os"

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
