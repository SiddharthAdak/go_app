package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"server/helpers"

	"github.com/redis/go-redis/v9"
)

type NewUser struct {
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Username        string `json:"username"`
}
type SignupResponse struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func Signup(w http.ResponseWriter, r *http.Request) {
	var userData NewUser
	// decode json data
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		http.Error(w, "Error decoding data", http.StatusBadRequest)
		return
	}
	Username := userData.Username
	Password := userData.Password
	ConfirmPassword := userData.ConfirmPassword
	// check for data validity
	errorString, isValid := helpers.CheckValidSignup(Username, Password, ConfirmPassword)
	if !isValid {
		http.Error(w, errorString, http.StatusBadRequest)
		return
	}
	fmt.Println(isValid)
	hash, err := helpers.HashPassword(Password)

	if err != nil {
		http.Error(w, "failed to hash password", http.StatusBadRequest)
		return
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	err = database.RedisClient.HSet(ctx, "users", Username, hash).Err()
	if err != nil {
		http.Error(w, "Unable to connect with db", http.StatusBadRequest)
		return
	}
	token, err := helpers.GenerateJWTToken(Username)
	if err != nil {
		http.Error(w, "Unable to sign you up", http.StatusBadRequest)
		return
	}
	err = database.RedisClient.ZAdd(ctx, "scores", redis.Z{Score: 0, Member: Username}).Err()
	if err != nil {
		http.Error(w, "Unable to connect with db", http.StatusBadRequest)
		return
	}
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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SignupResponse{
		Username: Username,
		Score:    0,
	})
}
