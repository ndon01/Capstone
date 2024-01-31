package authentication

import (
	"WellWeb/modules/authentication/dto/requests"
	"WellWeb/modules/authentication/util"
)

/*
	Registration

	Users will be able to register with either: email address / phone number

	Display Name is optional and can be set later, but will default to the username provided
	Username is required and must be unique
	Email Address or Phone Number is required and must be unique
	Date of Birth is required and must be in the format "YYYY-MM-DD"
	Password is required and must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character

	All requests will return a JWT token if the user is authenticated
*/

func registerUser() {

}

/*
	Authentication

	Users will first be able to enter either their username, email address, or phone number.
	They will then be prompted to enter their password, or recieve a verification code if they are using a phone number/email address.

	AuthType can be "password", "email", "phone", or "code"

	if AuthType is "password":
		- AuthData will contain the username/email/phone and password

	if AuthType is "email":
		- AuthData will contain the email address
		- A verification code will be sent to the email address
		- The user will then need to resend the request with the verification code in the AuthData

	if AuthType is "phone":
		- AuthData will contain the phone number
		- A verification code will be sent to the phone number
		- The user will then need to resend the request with the verification code in the AuthData

	if AuthType is "code":
		- AuthData will contain the username/email/phone and the verification code
		- The verification code will be checked and the user will be logged in if it is correct

	if AuthType is "google":
		- AuthData will contain the google token
		- The google token will be verified and the user will be logged in if it is correct

	All requests will return a JWT token if the user is authenticated

*/

func authenticate(request *requests.AuthenticationRequest) {

	authProvider := util.GenerateAuthProvider(request.AuthType)

	if authProvider == nil {
		// return error
	}

}

// Verification
