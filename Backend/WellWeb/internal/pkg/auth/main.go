package auth

import (
	"WellWeb/internal/core/server"
)

type Auth interface {
}

type auth struct {
	repository *repository
	service    *service
	controller *controller
	routes     *routes
}

func Init(server *server.Server) {
	var auth = new(auth)

	var (
		repository = newRepository()
		service    = newService(repository)
		controller = newController(service)
		routes     = newRoutes(server, controller)
	)

	auth.repository = repository
	auth.service = service
	auth.controller = controller
	auth.routes = routes
}
