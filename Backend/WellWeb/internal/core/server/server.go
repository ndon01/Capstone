package server

import (
	"fmt"
	"net/http"
	"time"
)

type Server interface {
	Run()
	AddRoute(path string, handler http.HandlerFunc)
	AddApiRoute(path string, handler http.HandlerFunc)
}

type server struct {
	http *http.Server
	mux  *http.ServeMux
}

func Init(port int) Server {

	var server = new(server)
	server.mux = http.NewServeMux()
	server.http = &http.Server{
		Addr:           ":" + fmt.Sprint(int(port)),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
		Handler:        server.mux,
	}

	return server

}

func (s *server) Run() {
	fmt.Println("Server exposed on port", s.http.Addr)
	defer s.http.ListenAndServe()
}

func (server *server) AddRoute(path string, handler http.HandlerFunc) {
	server.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("API Request", r.Method, r.URL, r.Body)
		if r.Method == "OPTIONS" {

			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			w.WriteHeader(200)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")

		handler(w, r)
	})
}

func (server *server) AddApiRoute(path string, handler http.HandlerFunc) {
	server.mux.HandleFunc("/api"+path, func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("API Request", r.Method, r.URL, r.Body)

		if r.Method == "OPTIONS" {

			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			w.WriteHeader(200)
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		handler(w, r)
	})
}

func (server *server) Stop() {
	server.http.Close()
}
