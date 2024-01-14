package main

import (
	"github.com/teamortix/golang-wasm/wasm"
	"syscall/js"
)

const (
	// WASM doesn't enjoy the big buffer sizes allocated by default
	msgQueueBufferSize = 128 * 1024
)

var (
	fileLength = 0
)

func test() (string, error) {
	return "Hello, from Golang!", nil
}

func getFileLength() int {
	return fileLength
}

func passFileToGo(this js.Value, p js.Value) interface{} {
	typedArray := js.Global().Get("Uint8Array").New(p)
	dataArray := make([]byte, typedArray.Length())
	js.CopyBytesToGo(dataArray, typedArray)
	return (len(dataArray))
}

func main() {
	c := make(chan struct{}, 0)

	wasm.Expose("passFileToGo", passFileToGo)

	wasm.Ready()

	<-c
}
