package controller

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"

	"github.com/redis/go-redis/v9"
)

type MemberScore struct {
	Member string `json:"member"`
	Score  int    `json:"score"`
}
type GetScoresResponse struct {
	Scores []MemberScore `json:"scores"`
}

func GetScores(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	result, err := database.RedisClient.ZRevRangeByScoreWithScores(ctx, "scores", &redis.ZRangeBy{
		Min: "-inf",
		Max: "+inf",
	}).Result()
	if err != nil {
		http.Error(w, "Unable to connect with db", http.StatusBadRequest)
		return
	}
	var memberScores []MemberScore
	for _, z := range result {
		memberScores = append(memberScores, MemberScore{
			Member: z.Member.(string),
			Score:  int(z.Score),
		})
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(GetScoresResponse{
		Scores: memberScores,
	})
}
