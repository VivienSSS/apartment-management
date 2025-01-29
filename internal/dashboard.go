package internal

import (
	"github.com/VivienSSS/apartment-management/web"
	"github.com/labstack/echo/v4"
)

func DashBoardPageHandler(c echo.Context) error {
	return web.DashboardPage().Render(c.Request().Context(), c.Response().Writer)
}
