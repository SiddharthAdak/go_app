package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"server/helpers"
)

type User struct {
	Password string `json:"password"`
	Username string `json:"username"`
}
type LoginResponse struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var userData User
	// decode json data
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		http.Error(w, "Error decoding data", http.StatusBadRequest)
		return
	}
	Username := userData.Username
	Password := userData.Password

	// check for data validity
	errorString, isValid := helpers.CheckValidLogin(Username, Password)
	if !isValid {
		http.Error(w, errorString, http.StatusBadRequest)
		return
	}
	fmt.Println(isValid)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// get user scores
	score, err := database.RedisClient.ZScore(ctx, "scores", Username).Result()
	if err != nil {
		http.Error(w, "Unable to connect", http.StatusBadRequest)
		return
	}
	// generate token
	token, err := helpers.GenerateJWTToken(Username)
	if err != nil {
		http.Error(w, "Unable to login", http.StatusBadRequest)
		return
	}
	// set cookie
	w.Header().Set("Content-Type", "application/json")
	cookie := http.Cookie{
		Name:     "jwt",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		MaxAge:   24 * 60 * 60,
		Secure:   true,
	}
	http.SetCookie(w, &cookie)

	// give json response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SignupResponse{
		Username: Username,
		Score:    int(score),
	})
}
