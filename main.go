package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Post struct {
	// structure of a post
	Title   string
	Project string
}

var posts []Post // it's in-memory slice to store our submitted posts

func main() {
	// handler := http.FileServer(http.Dir("./static"))
	http.HandleFunc("/", handleIndex)
	// http.HandleFunc("/submit", handleSubmit)

	fmt.Println("showing your bullshit on localhost:8080")
	// http.ListenAndServe(":8080", handler)
	println(posts)
	http.ListenAndServe(":8080", nil)
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("static/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

func handleSubmit(w http.ResponseWriter, r *http.Request) {
	title := r.FormValue("title")
	project := r.FormValue("project")

	post := Post{
		Title:   title,
		Project: project,
	}

	posts = append(posts, post)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
