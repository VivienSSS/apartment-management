// Code generated by templ - DO NOT EDIT.

// templ: version: v0.3.819
package web

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import templruntime "github.com/a-h/templ/runtime"

func PaymentsMetadata() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 1, "<title>Payments Page</title>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func PaymentsPage() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var2 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var2 == nil {
			templ_7745c5c3_Var2 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Var3 := templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
			templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
			templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
			if !templ_7745c5c3_IsBuffer {
				defer func() {
					templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
					if templ_7745c5c3_Err == nil {
						templ_7745c5c3_Err = templ_7745c5c3_BufErr
					}
				}()
			}
			ctx = templ.InitializeContext(ctx)
			templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 2, "<main class=\"h-screen w-full flex flex-row\"><aside class=\"bg-[#abaaa9] p-4 border-r w-1/5\"><ul class=\"bg-[#abaaa9] menu flex flex-col gap-2.5\"><li><p class=\"menu-title\">Navigation</p></li><li><a href=\"/\"><span class=\"icon-[lucide--chart-column-increasing]\"></span> Home</a></li><li><a href=\"/\"><span class=\"icon-[lucide--receipt-text]\"></span>Billing</a></li><li><a href=\"/\"><span class=\"icon-[lucide--philippine-peso]\"></span> Payments</a></li><li><a href=\"/\"><span class=\"icon-[lucide--calendar-check-2]\"></span> Schedules</a></li></ul></aside><article class=\"p-4 w-3/4\"><div class=\"flex-none font-semibold text-xl text-black text-4xl\" aria-label=\"Payments\">Payments</div><hr class=\"border-[#abaaa9] border-2 border-b mt-6\"><div class=\"flex justify-end gap-x-2\"><button class=\"px-4 py-2 bg-[#001316] text-white mt-4 rounded-md w-1/5\">Create Bill</button> <button class=\"px-4 py-2 bg-[#001316] text-white mt-4 rounded-md w-1/5\">Create Transaction</button></div><div class=\"breadcrumbs\"><ul><li><a href=\"#\">Home</a></li><li class=\"breadcrumbs-separator rtl:rotate-180\"><span class=\"icon-[tabler--chevron-right]\"></span></li><li><a href=\"#\">Components</a></li><li class=\"breadcrumbs-separator rtl:rotate-180\"><span class=\"icon-[tabler--chevron-right]\"></span></li><li aria-current=\"page\">Breadcrumb</li></ul></div></article></main>")
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
			return nil
		})
		templ_7745c5c3_Err = BaseHTML(BaseHTMLProps{
			Metadata: PaymentsMetadata(),
		}).Render(templ.WithChildren(ctx, templ_7745c5c3_Var3), templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

var _ = templruntime.GeneratedTemplate
