package internal

import (
	"github.com/VivienSSS/apartment-management/web"
	"github.com/labstack/echo/v4"
)

func LogInPageHandler(c echo.Context) error {
	return web.LogInPage().Render(c.Request().Context(), c.Response().Writer)
}
