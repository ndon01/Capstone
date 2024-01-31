package authentication

import "net/http"

/*
    /authentication
	|__ /register
	|__ /login


*/

func generateRoutes() {
	http.HandleFunc("/authentication/register", registrationController)
}

func registrationController(w http.ResponseWriter, r *http.Request) {

}

func loginController(w http.ResponseWriter, r *http.Request) {

}
