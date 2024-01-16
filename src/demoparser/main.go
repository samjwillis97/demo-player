package main

import (
	"bytes"
	"errors"
	// "fmt"
	"log"
	"syscall/js"

	dem "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs"
	"github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/common"
	"github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/events"
	"github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/msgs2"
	"github.com/teamortix/golang-wasm/wasm"
)

const (
	// WASM doesn't enjoy the big buffer sizes allocated by default
	msgQueueBufferSize = 128 * 1024
)

var fileBytes *bytes.Buffer = nil

func main() {
	c := make(chan struct{}, 0)

	dem.DefaultParserConfig = dem.ParserConfig{
		MsgQueueBufferSize: msgQueueBufferSize,
	}

	wasm.Expose("checkVariables", checkVariables)

	wasm.Expose("openFile", openFile)
	wasm.Expose("getMapName", getMapName)
	wasm.Expose("getRoundInfo", getRoundInfo)

	wasm.Ready()

	<-c
}

func checkVariables(this js.Value, p js.Value) interface{} {
	return p
}

func openFile(this js.Value, data js.Value) bool {
	fileBytes = bytes.NewBuffer(uint8ArrayToBytes(data))
	return true
}

func getMapName() string {
	mapName := "Unknown"

	parser, err := getParser()
	defer parser.Close()

	if err != nil {
		log.Panic(err)
	}

	// https://github.com/markus-wa/demoinfocs-golang/issues/435#issuecomment-1762961645
	parser.RegisterNetMessageHandler(func(msg *msgs2.CSVCMsg_ServerInfo) {
		mapName = *msg.MapName
		parser.Cancel()
	})

	err = parser.ParseToEnd()
	if err != nil && err != dem.ErrCancelled {
		checkError(err)
	}

	return mapName
}

func getRoundInfo() []string {
	parser, err := getParser()
	defer parser.Close()

	if err != nil {
		log.Panic(err)
	}

	roundInfo := make([]string, 0)

	parser.RegisterEventHandler(func(e events.RoundEnd) {
		// state := parser.GameState()
		switch e.Winner {
		case common.TeamTerrorists:
			roundInfo = append(roundInfo, "T")
		case common.TeamCounterTerrorists:
			roundInfo = append(roundInfo, "CT")
		}
	})

	err = parser.ParseToEnd()
	checkError(err)

	return roundInfo
}

func uint8ArrayToBytes(value js.Value) []byte {
	s := make([]byte, value.Get("byteLength").Int())
	js.CopyBytesToGo(s, value)
	return s
}

func checkError(err error) {
	if err != nil {
		log.Panic(err.Error())
	}
}

func getParser() (dem.Parser, error) {
	if fileBytes == nil {
		return nil, errors.New("parse is nil")
	}

	return dem.NewParser(bytes.NewReader(fileBytes.Bytes())), nil
}
