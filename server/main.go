package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/database"
	"server/router"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	r := router.Router()
	fmt.Println("Server is getting started...")
	clientUrl1 := os.Getenv("CLIENTURL1")
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{clientUrl1},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}).Handler(r)
	database.Connection()
	PORT := os.Getenv("PORT")
	log.Fatal(http.ListenAndServe(":"+PORT, corsHandler))
	fmt.Println("Listening at port 4000 ...")

}
