init:
	bun install
	mkdir -p dist
	cp ./node_modules/flyonui/flyonui.js ./dist/flyonui.js 

dev-tailwind:
	bun tailwindcss -i web/app.css -o dist/out.css --watch --minify

dev-templ:
	templ generate --watch --proxybind="0.0.0.0" --open-browser=false --proxy="http://localhost:8080" --cmd="go run cmd/main.go"

dev:
	make -j2 dev-tailwind dev-templ