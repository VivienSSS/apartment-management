package main

import (
	"database/sql"
	"log"

	"github.com/VivienSSS/apartment-management/db_sqlite"
	"github.com/VivienSSS/apartment-management/internal"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	sqlite, err := sql.Open("sqlite", ":memory:")

	if err != nil {
		log.Fatal(err)
	}

	queries := db_sqlite.New(sqlite)

	e.AcquireContext().Set("queries", queries)

	e.GET("/login", internal.LogInPageHandler)
	e.GET("/dashboard", internal.DashBoardPageHandler)
	e.GET("/payments", internal.PaymentPageHandler)
	e.GET("/billing", internal.BillingPageHandler)
	e.Static("/assets", "dist")
	e.Logger.Fatal(e.Start(":8080"))
}
