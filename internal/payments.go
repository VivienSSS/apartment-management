package internal

import (
	"github.com/VivienSSS/apartment-management/web"
	"github.com/labstack/echo/v4"
)

func PaymentPageHandler(c echo.Context) error {
	return web.PaymentsPage().Render(c.Request().Context(), c.Response().Writer)
}
