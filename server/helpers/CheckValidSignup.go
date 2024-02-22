package helpers

import (
	"context"
	"fmt"
	"server/database"

	"github.com/redis/go-redis/v9"
)

func CheckValidSignup(Username string, Password string, ConfirmPassword string) (string, bool) {
	if Username == "" {
		return "Invalid username", false
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	// check for username in redis
	_, err := database.RedisClient.HGet(ctx, "users", Username).Result()
	if err != nil {
		if err == redis.Nil {
			fmt.Println("Key not found in Redis")
		} else {
			// other errors
			return "Unable to connect with db", false
		}
	} else {
		// user found so can't signup
		return "Username already in use", false
	}
	if len(Password) < 8 {
		return "Password should have 8+ chars", false
	}
	if ConfirmPassword != Password {
		return "Password and confirm password should be equal", false
	}
	return "", true
}
