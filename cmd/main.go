package main

import (
	"github.com/VivienSSS/apartment-management/internal"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/login", internal.LogInPageHandler)
	e.GET("/dashboard", internal.DashBoardPageHandler)
	e.GET("/payments", internal.PaymentPageHandler)
	e.GET("/billing", internal.BillingPageHandler)
	e.Static("/assets", "dist")
	e.Logger.Fatal(e.Start(":8080"))
}
