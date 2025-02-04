package internal

import (
	"github.com/VivienSSS/apartment-management/web"
	"github.com/labstack/echo/v4"
)

func BillingPageHandler(c echo.Context) error {
	return web.BillingPage().Render(c.Request().Context(), c.Response().Writer)
}
