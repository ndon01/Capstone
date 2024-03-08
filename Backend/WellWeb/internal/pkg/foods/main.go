package foods

import (
	"WellWeb/internal/core/server"
)

type Foods interface {
}

type foods struct {
	repository *repository
	service    *service
	controller *controller
	routes     *routes
}

func Init(server *server.Server) {
	var foods = new(foods)

	var (
		repository = newRepository()
		service    = newService(repository)
		controller = newController(service)
		routes     = newRoutes(server, controller)
	)

	foods.repository = repository
	foods.service = service
	foods.controller = controller
	foods.routes = routes
}
