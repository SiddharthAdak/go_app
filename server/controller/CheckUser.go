package controller

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
	"server/helpers"

	"github.com/redis/go-redis/v9"
)

func CheckUser(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("jwt")
	if err != nil {
		if err == http.ErrNoCookie {
			// Cookie not found
			http.Error(w, "no token found", http.StatusBadRequest)
			return
		}
		// some other errors
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	cookieValue := cookie.Value
	// decode jwt
	claims, err := helpers.DecodeJWTToken(cookieValue)
	if err != nil {
		// invalid jwt
		http.Error(w, "invalid token", http.StatusBadRequest)
		return
	}
	Username, _ := claims.GetSubject()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	_, err = database.RedisClient.HGet(ctx, "users", Username).Result()
	if err != nil {
		if err == redis.Nil {
			// invalid user
			http.Error(w, "invalid token", http.StatusBadRequest)

		} else {
			http.Error(w, "unable to connect to db", http.StatusBadRequest)
		}
		return
	}
	score, err := database.RedisClient.ZScore(ctx, "scores", Username).Result()
	if err != nil {
		http.Error(w, "Unable to connect to db", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LoginResponse{
		Username: Username,
		Score:    int(score),
	})
}
