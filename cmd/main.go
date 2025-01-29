package main

import (
	"github.com/VivienSSS/apartment-management/internal"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/login", internal.LogInPageHandler)
	e.GET("/dashboard", internal.DashBoardPageHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
