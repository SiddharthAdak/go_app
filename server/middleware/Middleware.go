package middleware

import (
	"context"
	"net/http"
	"server/database"
	"server/helpers"

	"github.com/redis/go-redis/v9"
)

// middleware for route protection
func Middleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("jwt")
		if err != nil {

			if err == http.ErrNoCookie {

				// Cookie not found
				http.Error(w, "invalid request", http.StatusBadRequest)
				return
			}

			// Handle other errors
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
		cookieValue := cookie.Value
		claims, err := helpers.DecodeJWTToken(cookieValue)

		if err != nil {

			//invalid token error
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
		Username, _ := claims.GetSubject()
		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()
		_, err = database.RedisClient.HGet(ctx, "users", Username).Result()
		if err != nil {
			if err == redis.Nil {

				// user not found
				http.Error(w, "invalid request", http.StatusBadRequest)
			} else {
				http.Error(w, "unable to connect to db", http.StatusBadRequest)
			}
		}

		// goto next function
		next.ServeHTTP(w, r)
	})
}
