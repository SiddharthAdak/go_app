package router

import (
	"server/controller"
	"server/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/auth/login", controller.Login).Methods("POST")
	router.HandleFunc("/auth/logout", controller.Logout).Methods("GET")
	router.HandleFunc("/auth/signup", controller.Signup).Methods("POST")
	router.HandleFunc("/auth/check", controller.CheckUser).Methods("GET")
	router.HandleFunc("/api/scores", middleware.Middleware(controller.GetScores)).Methods("GET")
	router.HandleFunc("/api/score", middleware.Middleware(controller.UpdateScore)).Methods("POST")
	return router
}
