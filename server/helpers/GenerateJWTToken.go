package helpers

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWTToken(Username string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": Username,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	jwtSecret := []byte(os.Getenv("JWT_SECRET"))

	// Sign token
	tokenString, err := token.SignedString(jwtSecret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
