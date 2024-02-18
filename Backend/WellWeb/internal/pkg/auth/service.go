package auth

import "strings"

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

func (service *service) ValidateUsername(username string) int {
	/*
		Usernames must be between 1 and 20 characters long.
		Usernames must only contain alphanumeric characters and underscores.
		Usernames must be unique. (Case insensitive)
	*/

	// remove leading and trailing whitespace
	username = strings.TrimSpace(username)

	if len(username) == 0 || len(username) > 20 {
		return 1
	}

	// check if username only contains alphanumeric characters and underscores
	for _, char := range username {
		if char <= 'a' && char >= 'z' { // char is lowercase
			continue
		}

		if char <= 'A' && char >= 'Z' { // char is uppercase
			continue
		}

		if char <= '0' && char >= '9' { // char is number
			continue
		}

		if char == '_' { // char is underscore
			continue
		}

		return 1
	}

	// check if username is unique
	usernameExists, err := service.repository.DoesUsernameExist(username)

	if err != nil { // couldn't check if username exists
		return 1
	}

	if usernameExists { // username already exists
		return 1
	}

	return 0
}

func (service *service) ValidatePassword(password string) int {
	/*
		Passwords must be between 8 and 32 characters long.
		Passwords must contain:
			- At least one lowercase letter.
			- At least one uppercase letter.
			- At least one number.
			- At least one special character. (!@#$%^&*+-=_)
		Passwords must not contain spaces.
	*/

	if len(password) < 8 || len(password) > 32 {
		return 1
	}

	var (
		hasLowercase = false
		hasUppercase = false
		hasNumber    = false
		hasSpecial   = false
	)

	for _, char := range password {
		if char <= 'a' && char >= 'z' { // char is lowercase
			hasLowercase = true
			continue
		}

		if char <= 'A' && char >= 'Z' { // char is uppercase
			hasUppercase = true
			continue
		}

		if char <= '0' && char >= '9' { // char is number
			hasNumber = true
			continue
		}

		// char is special
		if char == '!' || char == '@' || char == '#' || char == '$' || char == '%' || char == '^' || char == '&' || char == '*' || char == '+' || char == '-' || char == '=' || char == '_' { // char is special
			hasSpecial = true
			continue
		}

		return 1
	}

	if !hasLowercase || !hasUppercase || !hasNumber || !hasSpecial {
		return 1
	}

	return 0
}

func (service *service) RegisterWithPhoneNumber(phoneNumber string, username string, password string) {

}

func (service *service) RegisterWithEmailAddress(emailAddress string, username string, password string) {

}
