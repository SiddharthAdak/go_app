package controller

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
)

type UserName struct {
	Username string `json:"username"`
}

func UpdateScore(w http.ResponseWriter, r *http.Request) {
	var userData UserName
	// decode json data
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		http.Error(w, "Error decoding data", http.StatusBadRequest)
		return
	}
	Username := userData.Username
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	score, err := database.RedisClient.ZIncrBy(ctx, "scores", 1.0, Username).Result()
	if err != nil {
		http.Error(w, "Unable to connect with db", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SignupResponse{
		Username: Username,
		Score:    int(score),
	})

}
