package main

import (
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase"
)

func main() {
	fmt.Println("welcome to server")

	app := pocketbase.New()

	err := app.Start()

	if err == nil {
		log.Fatal(err)
	}
}
