# Refer to this for more:
# https://www.reddit.com/r/NixOS/comments/1fxf0am/setting_up_a_nextjs_project_as_a_systemd_service/
flake: {
  config,
  lib,
  pkgs,
  ...
}: let
  # Shortcut config
  cfg = config.services.devops-journey;

  # Packaged server
  server = flake.packages.${pkgs.stdenv.hostPlatform.system}.default;

  # Caddy module lugin
  caddy = lib.mkIf (cfg.enable && cfg.proxy.enable && cfg.proxy.proxy == "caddy") {
    services.caddy.virtualHosts = lib.debug.traceIf (builtins.isNull cfg.proxy.domain) "proxy.domain can't be null, please specicy it properly!" {
      "${cfg.proxy.domain}" = {
        serverAliases = cfg.proxy.aliases;
        extraConfig = ''
          reverse_proxy 127.0.0.1:${toString cfg.port}
        '';
      };
    };
  };

  # Nginx module plugin
  nginx = lib.mkIf (cfg.enable && cfg.proxy.enable && cfg.proxy.proxy == "nginx") {
    services.nginx.virtualHosts = lib.debug.traceIf (builtins.isNull cfg.proxy.domain) "proxy.domain can't be null, please specicy it properly!" {
      "${cfg.proxy.domain}" = {
        addSSL = true;
        enableACME = true;
        serverAliases = cfg.proxy.aliases;
        locations."/" = {
          proxyPass = "http://127.0.0.1:${toString cfg.port}";
          proxyWebsockets = true;
        };
      };
    };
  };

  # The systemd service
  service = lib.mkIf cfg.enable {
    users.users.${cfg.user} = {
      description = "DevOps Journey Website user";
      isSystemUser = true;
      group = cfg.group;
    };

    users.groups.${cfg.group} = {};

    systemd.services.devops-journey = {
      description = "Official website of DevOps Journey";
      documentation = ["https://github.com/devops-journey"];

      environment = {
        PORT = "${toString cfg.port}";
        HOSTNAME = cfg.host;
        NODE_ENV = "production";
      };

      after = ["network-online.target"];
      wants = ["network-online.target"];
      wantedBy = ["multi-user.target"];

      serviceConfig = {
        User = cfg.user;
        Group = cfg.group;
        Restart = "always";
        ExecStart = "${lib.getExe cfg.package}";
        StateDirectory = cfg.user;
        StateDirectoryMode = "0750";
        CapabilityBoundingSet = [
          "AF_NETLINK"
          "AF_INET"
          "AF_INET6"
        ];
        DeviceAllow = ["/dev/stdin r"];
        DevicePolicy = "strict";
        IPAddressAllow = "localhost";
        LockPersonality = true;
        NoNewPrivileges = true;
        PrivateDevices = true;
        PrivateTmp = true;
        PrivateUsers = true;
        ProtectClock = true;
        ProtectControlGroups = true;
        ProtectHome = true;
        ProtectHostname = true;
        ProtectKernelLogs = true;
        ProtectKernelModules = true;
        ProtectKernelTunables = true;
        ProtectSystem = "strict";
        ReadOnlyPaths = ["/"];
        RemoveIPC = true;
        RestrictAddressFamilies = [
          "AF_NETLINK"
          "AF_INET"
          "AF_INET6"
        ];
        RestrictNamespaces = true;
        RestrictRealtime = true;
        RestrictSUIDSGID = true;
        SystemCallArchitectures = "native";
        SystemCallFilter = [
          "@system-service"
          "~@privileged"
          "~@resources"
          "@pkey"
        ];
        UMask = "0027";
      };
    };
  };

  asserts = lib.mkIf cfg.enable {
    warnings = [
      (lib.mkIf (cfg.proxy.enable && cfg.proxy.domain == null) "services.devops-journey.proxy.domain must be set in order to properly generate certificate!")
    ];
  };
in {
  options = with lib; {
    services.devops-journey = {
      enable = mkEnableOption ''
        DevOps Journey website.
      '';

      proxy = {
        enable = mkEnableOption ''
          Proxy reversed method of deployment
        '';

        domain = mkOption {
          type = with types; nullOr str;
          default = null;
          example = "devops-journey.uz";
          description = "Domain to use while adding configurations to web proxy server";
        };

        aliases = mkOption {
          type = with types; listOf str;
          default = [];
          example = ["www.devops-journey.uz"];
          description = "List of domain aliases to add to domain";
        };

        proxy = mkOption {
          type = with types;
            nullOr (enum [
              "nginx"
              "caddy"
            ]);
          default = "caddy";
          description = "Proxy reverse software for hosting website";
        };
      };

      host = mkOption {
        type = types.str;
        default = "127.0.0.1";
        description = "Hostname for nextjs server to bind";
      };

      port = mkOption {
        type = types.int;
        default = 8455;
        description = "Port to use for passing over proxy";
      };

      user = mkOption {
        type = types.str;
        default = "devops-journey";
        description = "User for running system + accessing keys";
      };

      group = mkOption {
        type = types.str;
        default = "devops-journey";
        description = "Group for running system + accessing keys";
      };

      dataDir = mkOption {
        type = types.str;
        default = "/var/lib/devops-journey/";
        description = lib.mdDoc ''
          The path where DevOps Journey Website server keeps data and possibly logs.
        '';
      };

      package = mkOption {
        type = types.package;
        default = server;
        description = ''
          Packaged devops-journey.uz website contents for service.
        '';
      };
    };
  };

  config = lib.mkMerge [asserts service caddy nginx];
}
