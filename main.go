package main

import (
	"fmt"
	"net/http"
)

func main() {
	handler := http.FileServer(http.Dir("./static"))

	fmt.Println("showing your bullshit on localhost:8080")
	http.ListenAndServe(":8080", handler)
}
