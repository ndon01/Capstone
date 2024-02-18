package auth

import "WellWeb/internal/core/server"

type routes struct {
	controller *controller
	server     *server.Server
}

func newRoutes(serverPointer *server.Server, controllerPointer *controller) *routes {

	var routes = new(routes)

	routes.server = serverPointer
	routes.controller = controllerPointer

	controller := *routes.controller
	server := *routes.server

	// Initialize Routes

	server.AddApiRoute("/auth/login", controller.Login)
	server.AddApiRoute("/auth/register", controller.Register)

	return routes

}
