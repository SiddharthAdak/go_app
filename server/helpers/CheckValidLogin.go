package helpers

import (
	"context"
	"server/database"

	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

func CheckValidLogin(Username string, Password string) (string, bool) {
	if Username == "" {
		return "Invalid username", false
	}
	if len(Password) < 8 {
		return "Invalid password", false
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	// check username in redis database
	hash, err := database.RedisClient.HGet(ctx, "users", Username).Result()
	if err != nil {
		if err == redis.Nil {
			return "Username not found", false
		} else {
			// Handle other types of errors
			return "Unable to connect with db", false
		}
	}
	// compare password
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(Password))
	if err != nil {
		return "Invalid password", false
	}

	return "", true
}
