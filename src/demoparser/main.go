package main

import (
	"github.com/teamortix/golang-wasm/wasm"
)

const (
	// WASM doesn't enjoy the big buffer sizes allocated by default
	msgQueueBufferSize = 128 * 1024
)

func test() (string, error) {
	return "Hello, from Golang!", nil
}

func main() {
	wasm.Expose("test", test)
	wasm.Ready()
	<-make(chan struct{}, 0)
}
