package foods

import (
	"WellWeb/internal/util/requestutil"
	"encoding/json"
	"fmt"
	"net/http"
)

type controller struct {
	service *service
}

func newController(service *service) *controller {
	var controller = new(controller)

	controller.service = service

	return controller
}

type CreateFoodRequest struct {
	Name string `json:"name"`
}

type CreateFoodResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Data    string `json:"data"`
}

func (controller *controller) CreateFood(w http.ResponseWriter, r *http.Request) {
	if requestutil.ValidateRequestMethod("POST", w, r) != 0 {
		return
	}

	if requestutil.ValidateContentType("application/json", w, r) != 0 {
		return
	}

	// check bearer token
	token := requestutil.GetBearerToken(r)
	if token == nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// check if the food data is present
	var foodRequest CreateFoodRequest
	err := json.NewDecoder(r.Body).Decode(&foodRequest)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(foodRequest.Name) == 0 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(foodRequest.Name) > 100 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return

	}

	// Create the food
	food, err := controller.service.CreateFood(token, foodRequest.Name)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := CreateFoodResponse{
		Status:  "success",
		Message: "Food Created",
		Data:    food,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
	fmt.Println("Food Created: ", food)

	return
}

type CreateBrandRequest struct {
	Name string `json:"name"`
}

type CreateBrandResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Data    string `json:"data"`
}

func (controller *controller) CreateBrand(w http.ResponseWriter, r *http.Request) {
	if requestutil.ValidateRequestMethod("POST", w, r) != 0 {
		return
	}

	if requestutil.ValidateContentType("application/json", w, r) != 0 {
		return
	}

	// check bearer token
	token := requestutil.GetBearerToken(r)
	if token == nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// check if the brand data is present
	var brandRequest CreateBrandRequest
	err := json.NewDecoder(r.Body).Decode(&brandRequest)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(brandRequest.Name) == 0 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	if len(brandRequest.Name) > 100 {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return

	}

	// Create the brand
	brand, err := controller.service.CreateBrand(token, brandRequest.Name)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := CreateBrandResponse{
		Status:  "success",
		Message: "Brand Created",
		Data:    brand,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
	fmt.Println("Brand Created: ", brand)

	return
}
