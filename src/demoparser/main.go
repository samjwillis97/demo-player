package main

import (
	"bytes"
	"log"
	"syscall/js"

	dem "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs"
	"github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/msgs2"
	"github.com/teamortix/golang-wasm/wasm"
)

const (
	// WASM doesn't enjoy the big buffer sizes allocated by default
	msgQueueBufferSize = 128 * 1024
)

func main() {
	c := make(chan struct{}, 0)

	dem.DefaultParserConfig = dem.ParserConfig{
		MsgQueueBufferSize: msgQueueBufferSize,
	}

	wasm.Expose("checkVariables", checkVariables)
	wasm.Expose("passFileToGo", passFileToGo)
	wasm.Expose("parseFile", parseFile)

	wasm.Ready()

	<-c
}

func checkVariables(this js.Value, p js.Value) interface{} {
	return p
}

func parseFile(this js.Value, data js.Value) interface{} {
	b := bytes.NewBuffer(uint8ArrayToBytes(data))
	parser := dem.NewParser(b)

	defer parser.Close()

	// https://github.com/markus-wa/demoinfocs-golang/issues/435#issuecomment-1762961645
	mapName := "Unknown"

	parser.RegisterNetMessageHandler(func(msg *msgs2.CSVCMsg_ServerInfo) {
		mapName = *msg.MapName
		parser.Cancel()
	})

	err := parser.ParseToEnd()
	if err != nil && err != dem.ErrCancelled {
		checkError(err)
	}

	return mapName
}

func uint8ArrayToBytes(value js.Value) []byte {
	s := make([]byte, value.Get("byteLength").Int())
	js.CopyBytesToGo(s, value)
	return s
}

func passFileToGo(this js.Value, p js.Value) (interface{}, error) {
	typedArray := js.Global().Get("Uint8Array").New(p)
	dataArray := make([]byte, typedArray.Length())
	js.CopyBytesToGo(dataArray, typedArray)

	reader := bytes.NewReader(dataArray)
	parser := dem.NewParser(reader)

	header, err := parser.ParseHeader()

	if err != nil {
		return nil, err
	}
	return header, nil
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}
