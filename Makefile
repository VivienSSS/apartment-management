
install/ubuntu:
	@sudo apt update
	@sudo apt upgrade

install/go:
	@sudo snap install go --classic
	@go install github.com/a-h/templ/cmd/templ@latest
	@echo "export PATH="$$PATH:$$HOME/go/bin"" >> ~/.bashrc
	@echo "export GOPATH="$$HOME/go"" >> ~/.bashrc

install/node:
	@curl -o- https://fnm.vercel.app/install | bash
	@. ~/.bashrc
	@fnm install 22

install/bun:
	@curl -fsSL https://bun.sh/install | bash

install:
	make -j install/ubuntu install/go install/node install/bun

init:
	bun install
	mkdir -p dist
	cp ./node_modules/flyonui/flyonui.js ./dist/flyonui.js 
	cp ./node_modules/alpinejs/dist/cdn.min.js ./dist/alpine.min.js
	cp ./node_modules/@alpinejs/collapse/dist/cdn.min.js ./dist/alpine-collapse.min.js
	go mod tidy

dev-tailwind:
	bun tailwindcss -i web/app.css -o dist/out.css --watch --minify

dev-templ:
	templ generate --watch --proxybind="0.0.0.0" --open-browser=false --proxy="http://localhost:8080" --cmd="go run cmd/main.go"

dev:
	make -j dev-tailwind dev-templ