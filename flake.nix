{
  description = "A modern JavaScript/TypeScript project template with React and Node.js";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    supportedSystems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];
    forEachSupportedSystem = f:
      nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    workmux = {
      panes = [
        {
          # vertical split = a divider running top-to-bottom -> right column
          command = "codex --yolo";
        }
        {
          # horizontal split off codex -> bottom of the right column
          split = "vertical";
          percentage = 40;
        }
      ];
    };

    devShells = forEachSupportedSystem ({pkgs}: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_26
          svelte-check

          chromium
          firefox
          playwright-driver.browsers
        ];

        PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
        PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";

        CHROME_BIN = "${pkgs.chromium}/bin/chromium";
        FIREFOX_BIN = "${pkgs.firefox}/bin/firefox";

        shellHook = ''
          echo "⚡ JavaScript/Svelte/Node.js Dev Shell Active!"
          echo "Node version: $(node --version)"
          echo "NPM version:  $(npm --version)"
          echo "Chromium:     $CHROME_BIN"
          echo "Firefox:      $FIREFOX_BIN"
          echo "Run: npm install && npm run dev"
        '';
      };
    });
  };
}
