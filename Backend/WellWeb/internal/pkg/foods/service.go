package foods

import (
	"WellWeb/internal/util/tokenutil"
	"fmt"
)

type service struct {
	repository *repository
}

func newService(repository *repository) *service {
	var service = new(service)

	service.repository = repository

	return service
}

func (service *service) CreateFood(token *string, name string) (string, error) {
	// Validate the token
	claims, err := tokenutil.GetToken(*token)
	if err != nil {
		return "", err
	}

	sub, err := claims.Claims.GetSubject()
	if err != nil {
		return "", err
	}

	fmt.Printf("user (%s) is making a food ('%s')\n", sub, name)

	// Create the food and return the id
	id, err := service.repository.CreateFood(name)
	if err != nil {
		fmt.Println("Error Creating Food: ", err)
		return "", err
	}

	return id, nil
}

func (service *service) CreateBrand(token *string, name string) (string, error) {
	// Validate the token
	claims, err := tokenutil.GetToken(*token)
	if err != nil {
		return "", err
	}

	sub, err := claims.Claims.GetSubject()
	if err != nil {
		return "", err
	}

	fmt.Printf("user (%s) is making a brand ('%s')\n", sub, name)

	// Create the brand and return the id
	id, err := service.repository.CreateBrand(name)
	if err != nil {
		fmt.Println("Error Creating Brand: ", err)
		return "", err
	}

	return id, nil
}

func (service *service) SearchBrand(token *string, searchFor string) (string, error) {
	// Validate the token
	claims, err := tokenutil.GetToken(*token)
	if err != nil {
		return "", err
	}

	sub, err := claims.Claims.GetSubject()
	if err != nil {
		return "", err
	}

	fmt.Printf("user (%s) is searching for a brand ('%s')\n", sub, searchFor)

	return "none", nil
}
