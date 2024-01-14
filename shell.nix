let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-unstable";
  pkgs = import nixpkgs { config = {}; overlays = []; };

  build-wasm = pkgs.writeShellScriptBin "build-wasm" ''
    go build -v -o $ROOT/src/parser.wasm
  '';
in

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
    # go_1_20
    build-wasm
  ];

  shellHook = ''
    export GO111MODULE=on
    export GOARCH=wasm
    export GOOS=js
    export GOPATH=$HOME/go
    export GOBIN=$GOPATH/bin
    export GOROOT=/usr/local/go
    # export GOCACHE=/tmp/gocache
    # export GOMODCACHE=/tmp/gomodcache
    # export GOPROXY="https://proxy.golang.org,direct"

    # export MSYS_NO_PATHCONV=1

    export PATH=$PWD/node_modules/.bin/:$PATH
    export ROOT=$PWD
  '';
}
