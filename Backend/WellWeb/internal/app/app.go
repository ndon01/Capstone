package app

import (
	"WellWeb/internal/core/server"
	"WellWeb/internal/pkg/auth"
	"WellWeb/internal/pkg/foods"
	"fmt"
)

type App interface {
}

type app struct {
	Server server.Server
}

func Init() App {

	var app = app{}

	app.initCore()
	app.initPkg()

	fmt.Println("App initialized")

	app.Server.Run()

	return app
}

func (app *app) initCore() {
	defer func() {
		fmt.Println("Core initialized")
	}()

	app.Server = server.Init(8080)
}

func (app *app) initPkg() {
	defer func() {
		fmt.Println("Packages initialized")
	}()

	var (
		server = app.Server
	)

	// Initialize all packages (modules)
	auth.Init(&server)
	foods.Init(&server)

}
