package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type LogoutResponse struct {
	Message string `json:"message"`
}

func Logout(w http.ResponseWriter, r *http.Request) {

	// set cookie
	w.Header().Set("Content-Type", "application/json")
	cookie := http.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		MaxAge:   0,
		Secure:   true,
	}
	http.SetCookie(w, &cookie)
	fmt.Println("logout")

	// give json response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LogoutResponse{
		Message: "logged out successfully",
	})
}
