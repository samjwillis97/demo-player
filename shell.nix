let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-unstable";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
  ];

  shellHook = ''
    export PATH=$PWD/node_modules/.bin/:$PATH
  '';
}
