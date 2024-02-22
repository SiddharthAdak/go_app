package database

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func Connection() {
	redisURL := os.Getenv("REDIS_URL")
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		panic(err)
	}

	RedisClient = redis.NewClient(opt)
	ctx := context.Background()
	pong, err := RedisClient.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Failed to connect to Redis:", err)
		panic(err)
	}
	fmt.Println("Connected to Redis:", pong)
}
