package foods

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

	server.AddApiRoute("/foods/create", controller.CreateFood)
	server.AddApiRoute("/brands/create", controller.CreateBrand)

	return routes

}
